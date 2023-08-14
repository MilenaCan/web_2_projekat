namespace Web2_Projekat.Models
{
    public class Article
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public long UserId { get; set; }
    }
}
