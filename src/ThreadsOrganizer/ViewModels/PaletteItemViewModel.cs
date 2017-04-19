using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ThreadsOrganizer.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class PaletteItemViewModel
    {
        public PaletteItemViewModel()
        {
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
    }
}
