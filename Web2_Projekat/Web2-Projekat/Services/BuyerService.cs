using AutoMapper;
using Web2_Projekat.Dto;
using Web2_Projekat.Exceptions;
using Web2_Projekat.Interfaces;
using Web2_Projekat.Interfaces.IServices;
using Web2_Projekat.Models;

namespace Web2_Projekat.Services
{
    public class BuyerService : IBuyerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly double deliveryFee = 3.50;

        public BuyerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateOrder(CreateOrderDto createOrder, int userId)
        {
            var order = _mapper.Map<Order>(createOrder);
            var user = await _unitOfWork.Users.Get(x => x.Id == userId);
            if (user == null)
                throw new BadRequestException($"User doesn't exist.");

            if (string.IsNullOrEmpty(order.DeliveryAddress))
                order.DeliveryAddress = user.Address;

            order.UserId = userId;
            order.OrderPrice = 0;
            order.OrderTime = DateTime.Now;
            var ids = new List<int>();
            foreach (var item in order.Items!)
            {
                var product = await _unitOfWork.Products.Get(x => x.Id == item.ProductId);
                if (product == null)
                    throw new BadRequestException("Invalid Product ID.");

                if (item.Amount < 0)
                    throw new BadRequestException($"Amount of {product.Name} can't be less than 0.");

                if (item.Amount > product.Amount)
                    throw new BadRequestException($"System doesn't have enough {product.Name}.");

                product.Amount -= item.Amount;
                _unitOfWork.Products.Update(product);

                item.Name = product.Name;
                item.Price = product.Price;
                order.OrderPrice += item.Price * item.Amount;
                if (!ids.Contains(product.SellerId))
                {
                    order.OrderPrice += deliveryFee;
                    ids.Add(product.SellerId);
                }
            }

            order.DeliveryTime = DateTime.MaxValue;
            await _unitOfWork.Orders.Insert(order);
            await _unitOfWork.Save();
        }

        public async Task CancelOrder(int userId, int id)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == userId, new List<string> { "Orders.Items" });
            if (user == null)
                throw new BadRequestException($"User doesn't exist.");

            var order = user.Orders!.First(x => x.Id == id);
            if (order == null)
                throw new NotFoundException($"Order doesn't belong to user.");


            if (order.OrderTime.AddHours(1) < DateTime.Now)
                throw new BadRequestException($"You can only cancel if it hasn't been an hour of order creation");

            order.IsCancelled = true;
            foreach (var item in order.Items!)
            {
                var product = await _unitOfWork.Products.Get(x => x.Id == item.ProductId);
                if (product != null)
                {
                    product.Amount += item.Amount;
                    _unitOfWork.Products.Update(product);
                }
            }

            _unitOfWork.Orders.Update(order);
            await _unitOfWork.Save();
        }

        public async Task<List<OrderDto>> GetMyOrders(int userId)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == userId, new List<string> { "Orders.Items" });
            if (user == null)
                throw new BadRequestException($"User doesn't exist.");

            var orders = user.Orders!.FindAll(x => !x.IsCancelled).OrderByDescending(x => x.OrderTime);
            return _mapper.Map<List<OrderDto>>(orders);
        }

        public async Task<List<ProductDto>> GetProducts()
        {
            var products = await _unitOfWork.Products.GetAll(null, null, new List<string> { "Seller" });
            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<double> GetPrice(List<CreateItemDto> items)
        {
            double price = 0;
            var ids = new List<int>();
            foreach (var item in items)
            {
                var product = await _unitOfWork.Products.Get(x => x.Id == item.ProductId);
                if (product == null)
                    throw new BadRequestException("Invalid Product ID.");

                if (item.Amount < 0)
                    throw new BadRequestException($"Amount of {product.Name} can't be less than 0.");

                if (item.Amount > product.Amount)
                    throw new BadRequestException($"System doesn't have enough {product.Name}.");

                price += product.Price * item.Amount;
                if (!ids.Contains(product.SellerId))
                {
                    price += deliveryFee;
                    ids.Add(product.SellerId);
                }
            }
            return price;
        }
    }
}
