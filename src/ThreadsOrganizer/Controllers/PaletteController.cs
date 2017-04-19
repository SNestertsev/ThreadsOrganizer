using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using ThreadsOrganizer.Data;
using ThreadsOrganizer.Data.Items;
using ThreadsOrganizer.Data.Lists;
using ThreadsOrganizer.Data.Users;
using ThreadsOrganizer.ViewModels;

namespace ThreadsOrganizer.Controllers
{
    public class PaletteController : BaseController
    {
        #region Constructor
        public PaletteController(ApplicationDbContext context,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager) : base(context, signInManager, userManager)
        {
        }
        #endregion Constructor

        #region RESTful Conventions
        /// <summary>
        /// GET: api/palette
        /// </summary>
        /// <returns>List of all existing palettes</returns>
        [HttpGet()]
        public IActionResult GetAllPalettes()
        {
            var items = DbContext.Palettes.OrderByDescending(i => i.Title).ToArray();
            return new JsonResult(ToPaletteViewModelList(items), DefaultJsonSettings);
        }

        /// <summary>
        /// GET: api/palette/{id}
        /// </summary>
        /// <param name="id">Palette identifier</param>
        /// <returns>Items of the specified palette</returns>
        [HttpGet("{id}")]
        public IActionResult GetPaletteItems(int id)
        {
            var palette = DbContext.Palettes
                .Where(i => i.Id == id).FirstOrDefault();
            if (palette != null)
            {
                DbContext.Entry(palette).Collection(p => p.Items).Load();
                if (palette.Items == null)
                    return new JsonResult(new List<PaletteItemViewModel>(), DefaultJsonSettings);
                return new JsonResult(ToPaletteItemViewModelList(palette.Items), DefaultJsonSettings);
            }
            else
            {
                return NotFound(new { Error = $"Palette ID {id} has not been found" });
            }
        }

        /// <summary>
        /// POST: api/palette
        /// </summary>
        /// <returns>Creates a new Palette and returns it accordingly.</returns>
        [HttpPost]
        [Authorize(Roles = "Administrators")]
        public IActionResult AddPalette([FromBody]PaletteViewModel pvm)
        {
            if (pvm != null)
            {
                Palette item = Mapper.Map<Palette>(pvm);
                DbContext.Palettes.Add(item);
                DbContext.SaveChanges();
                return new JsonResult(Mapper.Map<PaletteViewModel>(item), DefaultJsonSettings);
            }
            return new StatusCodeResult(500);
        }

        /// <summary>
        /// DELETE: api/palette/{id}
        /// </summary>
        /// <param name="id">Palette identifier</param>
        /// <returns>Deletes the Palette, returning a HTTP status 200 (ok) when done.</returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrators")]
        public IActionResult DeletePalette(int id)
        {
            var item = DbContext.Palettes.Where(i => i.Id == id).FirstOrDefault();
            if (item != null)
            {
                DbContext.Palettes.Remove(item);
                DbContext.SaveChanges();
                return new OkResult();
            }
            return NotFound(new { Error = $"Palette ID {id} has not been found" });
        }

        /// <summary>
        /// POST: api/palette/{id}
        /// </summary>
        /// <param name="id">Palette identifier</param>
        /// <returns>Adds new item to the Palette and returns it accordingly.</returns>
        [HttpPost("{id}")]
        [Authorize(Roles = "Administrators")]
        public IActionResult AddPaletteItem(int id, [FromBody]PaletteItemViewModel pivm)
        {
            var palette = DbContext.Palettes.Where(i => i.Id == id).FirstOrDefault();
            if (palette == null)
            {
                return NotFound(new { Error = $"Palette ID {id} has not been found" });
            }
            if (pivm != null)
            {
                PaletteItem item = Mapper.Map<PaletteItem>(pivm);
                DbContext.Entry(palette).Collection(p => p.Items).Load();
                palette.Items.Add(item);
                DbContext.SaveChanges();
                return new JsonResult(Mapper.Map<PaletteItemViewModel>(item), DefaultJsonSettings);
            }
            return new StatusCodeResult(500);
        }

        /// <summary>
        /// DELETE: api/palette/{id}/item/{itemId}
        /// </summary>
        /// <param name="id">Palette identifier</param>
        /// <param name="itemId">Item identifier</param>
        /// <returns>Removes item from the palette, returning a HTTP status 200 (ok) when done.</returns>
        [HttpDelete("{id}/item/{itemId}")]
        [Authorize(Roles = "Administrators")]
        public IActionResult DeletePaletteItem(int id, int itemId)
        {
            var palette = DbContext.Palettes.Where(p => p.Id == id).FirstOrDefault();
            if (palette != null)
            {
                DbContext.Entry(palette).Collection(p => p.Items).Load();
                var item = palette.Items.FirstOrDefault(i => i.Id == itemId);
                if (item != null)
                {
                    palette.Items.Remove(item);
                    DbContext.SaveChanges();
                    return new OkResult();
                }
                return NotFound(new { Error = $"Palette Item ID {itemId} has not been found" });
            }
            return NotFound(new { Error = $"Palette ID {id} has not been found" });
        }

        #endregion RESTful Conventions

        #region Private methods
        private List<PaletteViewModel> ToPaletteViewModelList(IEnumerable<Palette> items)
        {
            var lst = new List<PaletteViewModel>();
            foreach (var i in items)
            {
                lst.Add(Mapper.Map<PaletteViewModel>(i));
            }
            return lst;
        }

        private List<PaletteItemViewModel> ToPaletteItemViewModelList(IEnumerable<PaletteItem> items)
        {
            var lst = new List<PaletteItemViewModel>();
            foreach (var i in items)
            {
                lst.Add(Mapper.Map<PaletteItemViewModel>(i));
            }
            return lst;
        }
        #endregion Private methods
    }
}
