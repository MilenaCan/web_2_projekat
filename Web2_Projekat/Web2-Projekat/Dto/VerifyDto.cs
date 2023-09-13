using System.ComponentModel.DataAnnotations;
using Web2_Projekat.Models;

namespace Web2_Projekat.Dto
{
    public class VerifyDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public VerificationStatus VerificationStatus { get; set; }
    }
}
