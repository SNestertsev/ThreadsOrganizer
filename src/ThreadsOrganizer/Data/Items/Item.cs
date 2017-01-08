using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ThreadsOrganizer.Data.Lists;

namespace ThreadsOrganizer.Data.Items
{
    public class Item
    {
        #region Constructor
        public Item()
        {

        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int ListId { get; set; }
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
        public string Text { get; set; }
        public string Notes { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }

        public int? PaletteId { get; set; }
        #endregion Properties

        #region Related Properties
        [ForeignKey("ListId")]
        public virtual ThreadList List { get; set; }

        [ForeignKey("PaletteId")]
        public virtual Palette Palette { get; set; }
        #endregion Related Properties
    }
}
