using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using OpenIddict.Core;
using OpenIddict.Models;
using CryptoHelper;

using ThreadsOrganizer.Data.Items;
using ThreadsOrganizer.Data.Lists;
using ThreadsOrganizer.Data.Users;
using Microsoft.Extensions.Configuration;
using System.Xml.Linq;

namespace ThreadsOrganizer.Data
{
    public class DbSeeder
    {
        #region Private Members
        private ApplicationDbContext DbContext;
        private RoleManager<IdentityRole> RoleManager;
        private UserManager<ApplicationUser> UserManager;
        private IConfiguration Configuration;
        #endregion Private Members

        #region Constructor
        public DbSeeder(ApplicationDbContext dbContext,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            DbContext = dbContext;
            RoleManager = roleManager;
            UserManager = userManager;
            Configuration = configuration;
        }
        #endregion Constructor

        #region Public Methods
        public async Task SeedAsync()
        {
            // Create the Db if it doesn't exist
            DbContext.Database.EnsureCreated();
            // Create default Application
            if (!DbContext.Applications.Any()) CreateApplication();
            // Create default Users
            if (!DbContext.Users.Any()) await CreateUsersAsync();
            // Create default palettes
            if (!DbContext.Palettes.Any()) CreatePalettes();
        }
        #endregion Public Methods

        #region Seed Methods
        private void CreateApplication()
        {
            DbContext.Applications.Add(new OpenIddictApplication
            {
                Id = Configuration["Authentication:OpenIddict:ApplicationId"],
                DisplayName = Configuration["Authentication:OpenIddict:DisplayName"],
                RedirectUri = Configuration["Authentication:OpenIddict:TokenEndPoint"],
                LogoutRedirectUri = "/",
                ClientId = Configuration["Authentication:OpenIddict:ClientId"],
                ClientSecret = Crypto.HashPassword(Configuration["Authentication:OpenIddict:ClientSecret"]),
                Type = OpenIddictConstants.ClientTypes.Public
            });
            DbContext.SaveChanges();
        }

        private async Task CreateUsersAsync()
        {
            DateTime createdDate = DateTime.Now;
            DateTime lastModifiedDate = DateTime.Now;
            string roleAdministrators = "Administrators";
            string roleRegistered = "Registered";

            // Create Roles (if the doesn't exist yet
            if (!await RoleManager.RoleExistsAsync(roleAdministrators))
            {
                await RoleManager.CreateAsync(new IdentityRole(roleAdministrators));
            }
            if (!await RoleManager.RoleExistsAsync(roleRegistered))
            {
                await RoleManager.CreateAsync(new IdentityRole(roleRegistered));
            }

            // Create the "Admin" ApplicationUser account (if it doesn't exist already)
            var user_Admin = new ApplicationUser()
            {
                UserName = "Admin",
                Email = "snestertsev@yandex.ru",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };
            // Insert "Admin" into the Database and also assign the "Administrator role to him.
            if (await UserManager.FindByIdAsync(user_Admin.Id) == null)
            {
                await UserManager.CreateAsync(user_Admin, "Pass4Admin");
                await UserManager.AddToRoleAsync(user_Admin, roleAdministrators);
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }

#if DEBUG
            // Create some sample registered user account(s) (if they don't exist already)
            var user_Rimma = new ApplicationUser()
            {
                UserName = "Rimma",
                Email = "rnestertseva@yandex.ru",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };
            // Insert sample registered user into the Database and also assign the "Registered" role to him.
            if (await UserManager.FindByIdAsync(user_Rimma.Id) == null)
            {
                await UserManager.CreateAsync(user_Rimma, "Pass4Rimma");
                await UserManager.AddToRoleAsync(user_Rimma, roleRegistered);
                user_Rimma.EmailConfirmed = true;
                user_Rimma.LockoutEnabled = false;
            }
#endif
            await DbContext.SaveChangesAsync();
        }

        private async void CreatePalettes()
        {
            HttpWebRequest httpRequest = WebRequest.CreateHttp("http://www.igla.ru/articles/colormap-muline/?gamma");
            WebResponse response = await httpRequest.GetResponseAsync();
            try
            {
                StreamReader reader = new StreamReader(response.GetResponseStream());
                string htmlText = await reader.ReadToEndAsync();

                //Selector: #content_text > table > tbody > tr > td:nth-child(1) > div > table
                //<table cellspacing="0" cellpadding="1" border="0" class="ctab">
                string startText = @"class=""ctab"">";
                int tableStart = htmlText.IndexOf(startText);
                if (tableStart < 0) return;     // Page formatting changed - the color table is not found
                tableStart += startText.Length;
                int tableEnd = htmlText.IndexOf("</table>", tableStart);
                string tableText = "<table>" + htmlText.Substring(tableStart, tableEnd - tableStart) + "</table>";
                tableText = tableText.Replace("&nbsp;", " ");
                XDocument xdoc = XDocument.Parse(tableText);
                bool firstRow = true;
                Palette gammaPalette = new Palette() { Title = "Gamma", Items = new List<PaletteItem>() };
                Palette dmcPalette = new Palette() { Title = "DMC", Items = new List<PaletteItem>() };
                Palette ancorPalette = new Palette() { Title = "Ancor", Items = new List<PaletteItem>() };
                Palette madeiraPalette = new Palette() { Title = "Madeira", Items = new List<PaletteItem>() };
                foreach (XElement tr in xdoc.Descendants("tr"))
                {
                    if (firstRow)
                    {
                        firstRow = false;
                        continue;   // Pass the first row
                    }
                    // Gamma - DMC - Anchor - Madeira - Цвет
                    XElement[] td = tr.Descendants("td").ToArray();
                    if (td.Length < 5) continue;
                    string gammaValue = td[0].Value.Trim();
                    string dmcValue = td[1].Value.Trim();
                    string ancorValue = td[2].Value.Trim();
                    string madeiraValue = td[3].Value.Trim();
                    string colorCode = GetBackgroundColor(td[4]);
                    if (colorCode == null) continue;
                    AddItemToPalette(gammaPalette, gammaValue, colorCode);
                    AddItemToPalette(dmcPalette, dmcValue, colorCode);
                    AddItemToPalette(ancorPalette, ancorValue, colorCode);
                    AddItemToPalette(madeiraPalette, madeiraValue, colorCode);
                }
                DbContext.Palettes.Add(gammaPalette);
                DbContext.Palettes.Add(dmcPalette);
                DbContext.Palettes.Add(ancorPalette);
                DbContext.Palettes.Add(madeiraPalette);
                await DbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.ToString());
            }
        }

        private string GetBackgroundColor(XElement elem)
        {
            XAttribute attrib = elem.Attribute("style");
            if (attrib == null) return null;
            string style = attrib.Value;
            string[] items = style.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (string item in items)
            {
                string[] name_val = item.Split(new char[] { ':' }, StringSplitOptions.RemoveEmptyEntries);
                if (name_val.Length < 2) continue;
                if (name_val[0].Trim() == "background-color")
                {
                    return name_val[1].Trim();
                }
            }
            return null;
        }

        private void AddItemToPalette(Palette palette, string name, string color)
        {
            if (string.IsNullOrEmpty(name) || name == "-") return;
            name = name.TrimEnd(new char[] { '*' });
            palette.Items.Add(new PaletteItem()
            {
                Name = name,
                Color = color.ToUpper(),
                PaletteId = palette.Id
            });
        }
        #endregion Seed Methods
    }
}
