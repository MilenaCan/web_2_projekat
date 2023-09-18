using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web2_Projekat.Models;

namespace Web2_Projekat.Settings
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        
            public void Configure(EntityTypeBuilder<Product> builder)
            {
                builder.HasKey(x => x.Id);
                builder.Property(x => x.Name).HasMaxLength(100).IsRequired();
                builder.Property(x => x.Price).IsRequired();
                builder.Property(x => x.Amount).IsRequired();
                builder.Property(x => x.Description).HasMaxLength(200);
                builder.HasOne(x => x.Seller).WithMany(x => x.Products).HasForeignKey(x => x.SellerId).OnDelete(DeleteBehavior.Cascade);

                builder.HasData(new Product
                {
                    Id = 1,
                    Name = "Grozdje",
                    Price = 1.20,
                    Amount = 10,
                    Description = "123",
                    SellerId = 2,
                });
            }
        }
    }

