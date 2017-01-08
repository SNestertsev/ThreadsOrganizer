using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ThreadsOrganizer.Data.Items;

namespace ThreadsOrganizer.Data.Lists
{
    public class Palette
    {
        #region Constructor
        public Palette()
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
        public string LogoImage { get; set; }
        #endregion Properties

        #region Related Properties
        public virtual List<PaletteItem> Items { get; set; }
        #endregion Related Properties
    }
}
