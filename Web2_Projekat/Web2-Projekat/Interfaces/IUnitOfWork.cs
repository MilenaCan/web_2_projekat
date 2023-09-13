using Web2_Projekat.Models;

namespace Web2_Projekat.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<User> Users { get; }
        IRepository<Order> Orders { get; }
        IRepository<Item> Items { get; }
        IRepository<Product> Products { get; }


        Task Save();
    }
}
