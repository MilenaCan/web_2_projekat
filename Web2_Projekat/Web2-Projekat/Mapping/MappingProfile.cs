using AutoMapper;
using Web2_Projekat.Dto;
using Web2_Projekat.Models;

namespace Web2_Projekat.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<User, RegisterDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, EditProfileDTO>().ReverseMap();
            CreateMap<User, SellerDTO>().ReverseMap();

            CreateMap<Order, CreateOrderDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();

            CreateMap<Item, ItemDTO>().ReverseMap();
            CreateMap<Item, CreateItemDTO>().ReverseMap();

            CreateMap<Product, CreateProductDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
        }
    }
}
