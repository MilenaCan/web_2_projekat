namespace Web2_Projekat.Dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string? DeliveryAddress { get; set; }
        public double? PositionX { get; set; }
        public double? PositionY { get; set; }
        public string? Comment { get; set; }
        public DateTime OrderTime { get; set; }
        public DateTime DeliveryTime { get; set; }
        public double OrderPrice { get; set; }
        public bool? IsCancelled { get; set; }
        public List<ItemDto>? Items { get; set; }
        public bool Approved { get; set; }
    }
}
