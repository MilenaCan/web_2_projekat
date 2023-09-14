using AutoMapper;
using Web2_Projekat.Dto;
using Web2_Projekat.Models;

namespace Web2_Projekat.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<User, RegisterDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, EditProfileDto>().ReverseMap();
            CreateMap<User, SellerDto>().ReverseMap();

            CreateMap<Order, CreateOrderDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();

            CreateMap<Item, ItemDto>().ReverseMap();
            CreateMap<Item, CreateItemDto>().ReverseMap();

            CreateMap<Product, CreateProductDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
        }
    }
}
