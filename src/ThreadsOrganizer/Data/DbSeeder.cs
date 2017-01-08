using System;
using System.Linq;
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
        #endregion Seed Methods
    }
}
