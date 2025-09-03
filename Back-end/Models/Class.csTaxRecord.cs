using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class TaxRecord
    {
        [Key] // Primary key
        public int Id { get; set; }

        [Required] // Mandatory field
        public string RecordTitle { get; set; }

        [Required]
        public int TaxYear { get; set; }

        [Required]
        public decimal IncomeAmount { get; set; }

        [Required]
        public decimal DeductionsAmount { get; set; }

        public string Notes { get; set; }
    }
}
