using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ThreadsOrganizer.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ItemViewModel
    {
        public ItemViewModel()
        { }

        public int Id { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// ARGB code of thread color
        /// </summary>
        public string Color { get; set; }
        /// <summary>
        /// Optional description
        /// </summary>
        public string Description { get; set; }
        public string Text { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public int? PaletteId { get; set; }
    }
}
