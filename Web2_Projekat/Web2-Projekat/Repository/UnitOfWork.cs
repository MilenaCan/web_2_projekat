using Web2_Projekat.Data;
using Web2_Projekat.Interfaces;
using Web2_Projekat.Models;

namespace Web2_Projekat.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly Web2_ProjekatContext _context;
        public IRepository<User> Users { get; }
        public IRepository<Order> Orders { get; }
        public IRepository<Item> Items { get; }
        public IRepository<Product> Products { get; }

        public UnitOfWork(Web2_ProjekatContext context, IRepository<User> users, IRepository<Order> orders, IRepository<Item> items, IRepository<Product> products)
        {
            _context = context;
            Users = users;
            Orders = orders;
            Items = items;
            Products = products;
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
