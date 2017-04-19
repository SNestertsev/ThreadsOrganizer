using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ThreadsOrganizer.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ThreadListViewModel
    {
        public ThreadListViewModel()
        {
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public int? DefaultPaletteId { get; set; }
    }
}
