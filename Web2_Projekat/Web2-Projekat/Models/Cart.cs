namespace Web2_Projekat.Models
{
    public class Cart
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string ShippingAddress { get; set; }
        public string Comment { get; set; }
        public long StatusId { get; set; }
        public DateTime DeliveryTime { get; set; }
    }
}
