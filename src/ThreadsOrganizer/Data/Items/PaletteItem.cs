using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ThreadsOrganizer.Data.Lists;

namespace ThreadsOrganizer.Data.Items
{
    public class PaletteItem
    {
        #region Constructor
        public PaletteItem()
        {

        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int PaletteId { get; set; }
        /// <summary>
        /// Name of the thread color in palette.
        /// This can be words or numeric code.
        /// </summary>
        [Required]
        public string Name { get; set; }
        /// <summary>
        /// ARGB code of thread color
        /// </summary>
        [Required]
        public string Color { get; set; }
        /// <summary>
        /// Optional description
        /// </summary>
        public string Description { get; set; }
        #endregion Properties

        #region Related Properties
        [ForeignKey("PaletteId")]
        public virtual Palette Palette { get; set; }
        #endregion Related Properties
    }
}
