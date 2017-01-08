using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using OpenIddict;

using ThreadsOrganizer.Data.Lists;

namespace ThreadsOrganizer.Data.Users
{
    public class ApplicationUser : IdentityUser
    {
        #region Constructor
        public ApplicationUser()
        {

        }
        #endregion Constructor

        #region Properties
        public string DisplayName { get; set; }
        public string Notes { get; set; }
        [Required]
        public int Type { get; set; }
        [Required]
        public int Flags { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties

        #region Related Properties
        /// <summary>
        /// A lists of threads created by this user
        /// </summary>
        public virtual List<ThreadList> Lists { get; set; }
        #endregion Related Properties
    }
}
