using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using ThreadsOrganizer.Data.Items;
using ThreadsOrganizer.Data.Users;

namespace ThreadsOrganizer.Data.Lists
{
    public class ThreadList
    {
        #region Constructor
        public ThreadList()
        {

        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }
        public int? DefaultPaletteId { get; set; }
        #endregion Properties

        #region Related Properties
        [ForeignKey("UserId")]
        public virtual ApplicationUser Owner { get; set; }

        [ForeignKey("DefaultPaletteId")]
        public virtual Palette DefaultPalette { get; set; }

        public virtual List<Item> Items { get; set; }
        #endregion Related Properties
    }
}
