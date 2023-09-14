using System.ComponentModel.DataAnnotations;

namespace Web2_Projekat.Dto
{
    public class CreateOrderDto
    {
        [Required, MaxLength(100)]
        public string? DeliveryAddress { get; set; }
        [Required]
        public double? PositionX { get; set; }
        [Required]
        public double? PositionY { get; set; }
        public string? Comment { get; set; }
        public List<CreateItemDto>? Items { get; set; }
    }
}
