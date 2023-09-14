using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Web2_Projekat.Dto;
using Web2_Projekat.Models;

namespace Web2_Projekat.Settings
{
    public class Web2_ProjekatContext : DbContext
    {
        public DbSet<User>? Users { get; set; }
        public DbSet<Product>? Products { get; set; }
        public DbSet<Order>? Orders { get; set; }

        public Web2_ProjekatContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(Web2_ProjekatContext).Assembly);
        }




    }
}
