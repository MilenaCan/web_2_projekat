using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Web2_Projekat.Dto;
using Web2_Projekat.Models;

namespace Web2_Projekat.Data
{
    public class Web2_ProjekatContext : DbContext
    {
        public Web2_ProjekatContext (DbContextOptions<Web2_ProjekatContext> options)
            : base(options)
        {
        }

        public DbSet<User> users { get; set; }
       // public DbSet<UserDto> users { get; set; }

        public DbSet<Web2_Projekat.Models.User> User { get; set; } = default!;

       

        public DbSet<Web2_Projekat.Models.Article>? Article { get; set; }

        public DbSet<Web2_Projekat.Models.Cart>? Cart { get; set; }

        public DbSet<Web2_Projekat.Models.Order>? Order { get; set; }

        public DbSet<Web2_Projekat.Models.OrderStatus>? OrderStatus { get; set; }

        public DbSet<Web2_Projekat.Models.Role>? Role { get; set; }

        public DbSet<Web2_Projekat.Models.Shop>? Shop { get; set; }

        public DbSet<Web2_Projekat.Models.Status>? Status { get; set; }
    }
}
