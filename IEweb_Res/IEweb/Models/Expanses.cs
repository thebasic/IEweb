using System;
using System.Collections.Generic;

namespace IEweb.Models
{
    public partial class Expanses
    {
        public int Id { get; set; }
        public DateTime? EDate { get; set; }
        public string EList { get; set; }
        public int? Expenses { get; set; }
    }
}
