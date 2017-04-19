using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ThreadsOrganizer.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class PaletteViewModel
    {
        public PaletteViewModel()
        {
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string LogoImage { get; set; }
    }
}
