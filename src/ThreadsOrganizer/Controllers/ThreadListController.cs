using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
    public class ThreadListController : BaseController
    {
        #region Constructor
        public ThreadListController(ApplicationDbContext context, 
            SignInManager<ApplicationUser> signInManager, 
            UserManager<ApplicationUser> userManager) : base(context, signInManager, userManager)
        {
        }
        #endregion Constructor

        #region RESTful Conventions
        /// <summary>
        /// GET: api/threadList
        /// </summary>
        /// <returns>List of all thread lists of current user</returns>
        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> GetAllThreadLists()
        {
            var userId = await GetCurrentUserId();
            var items = DbContext.Lists.Where(l => l.UserId == userId).ToList();
            return new JsonResult(ToThreadListViewModelList(items), DefaultJsonSettings);
        }

        /// <summary>
        /// GET: api/threadList/{id}
        /// </summary>
        /// <param name="id">Thread list identifier</param>
        /// <returns>Detailes of the thread list</returns>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetDetails(int id)
        {
            var userId = await GetCurrentUserId();
            var list = DbContext.Lists.Where(l => l.Id == id && l.UserId == userId).FirstOrDefault();
            if (list != null)
            {
                return new JsonResult(Mapper.Map<ThreadListViewModel>(list), DefaultJsonSettings);
            }
            else
            {
                return NotFound(new { Error = $"Thread List ID {id} has not been found" });
            }
        }

        /// <summary>
        /// GET: api/threadList/{id}/items
        /// </summary>
        /// <param name="id">Thread list identifier</param>
        /// <returns>Items of the specified list</returns>
        [HttpGet("{id}/items")]
        [Authorize]
        public async Task<IActionResult> GetListItems(int id)
        {
            var userId = await GetCurrentUserId();
            var list = DbContext.Lists.Where(l => l.Id == id && l.UserId == userId).FirstOrDefault();
            if (list != null)
            {
                DbContext.Entry(list).Collection(p => p.Items).Load();
                if (list.Items == null)
                    return new JsonResult(new List<ItemViewModel>(), DefaultJsonSettings);
                return new JsonResult(ToItemViewModelList(list.Items), DefaultJsonSettings);
            }
            else
            {
                return NotFound(new { Error = $"Thread List ID {id} has not been found" });
            }
        }

        /// <summary>
        /// POST: api/threadList
        /// </summary>
        /// <returns>Creates a new List and return it accordingly.</returns>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromBody]ThreadListViewModel tlvm)
        {
            if (tlvm != null)
            {
                var list = Mapper.Map<ThreadList>(tlvm);
                list.CreatedDate = list.LastModifiedDate = DateTime.Now;
                list.UserId = await GetCurrentUserId();

                DbContext.Lists.Add(list);
                DbContext.SaveChanges();
                return new JsonResult(Mapper.Map<ThreadListViewModel>(list), DefaultJsonSettings);
            }
            return new StatusCodeResult(500);
        }

        /// <summary>
        /// PUT: api/threadList/{id}
        /// </summary>
        /// <returns>Updates an existing ThreadList and return it accordingly.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update(int id, [FromBody] ThreadListViewModel tlvm)
        {
            if (tlvm != null)
            {
                var list = DbContext.Lists.Where(i => i.Id == id).FirstOrDefault();
                if (list != null)
                {
                    // handle the update (on per-property basis)
                    list.Title = tlvm.Title;
                    list.Description = tlvm.Description;
                    // override any property that could be wise to set from server-side only
                    list.LastModifiedDate = DateTime.Now;

                    DbContext.SaveChanges();
                    return new JsonResult(Mapper.Map<ThreadListViewModel>(list), DefaultJsonSettings);
                }
            }
            return NotFound(new { Error = $"ThreadList ID {id} has not been found" });
        }

        /// <summary>
        /// DELETE: api/items/{id}
        /// </summary>
        /// <returns>Deletes an Item, returning a HTTP status 200 (ok) when done.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            ThreadList list = DbContext.Lists.Where(i => i.Id == id).FirstOrDefault();
            if (list != null)
            {
                DbContext.Lists.Remove(list);
                DbContext.SaveChanges();
                return new OkResult();
            }
            return NotFound(new { Error = $"ThreadList ID {id} has not been found" });
        }
        #endregion RESTful Conventions

        #region Private methods
        private List<ThreadListViewModel> ToThreadListViewModelList(IEnumerable<ThreadList> items)
        {
            var lst = new List<ThreadListViewModel>();
            foreach (var i in items)
            {
                lst.Add(Mapper.Map<ThreadListViewModel>(i));
            }
            return lst;
        }

        private List<ItemViewModel> ToItemViewModelList(IEnumerable<Item> items)
        {
            var lst = new List<ItemViewModel>();
            foreach (var i in items)
            {
                lst.Add(Mapper.Map<ItemViewModel>(i));
            }
            return lst;
        }
        #endregion Private methods
    }
}
