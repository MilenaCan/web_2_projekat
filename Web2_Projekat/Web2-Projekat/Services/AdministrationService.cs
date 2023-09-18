using AutoMapper;
using Web2_Projekat.Dto;
using Web2_Projekat.Exceptions;
using Web2_Projekat.Interfaces;
using Web2_Projekat.Interfaces.IServices;
using Web2_Projekat.Models;

namespace Web2_Projekat.Services
{
    public class AdministrationService : IAdministrationService
    {
        IUnitOfWork _unitOfWork;
        IMailService _mailService;
        IMapper _mapper;

        public AdministrationService(IUnitOfWork unitOfWork, IMailService mailService, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mailService = mailService;
            _mapper = mapper;
        }

        public async Task<List<OrderDto>> GetAllOrders()
        {
            var orders = await _unitOfWork.Orders.GetAll(null, x => x.OrderByDescending(y => y.OrderTime), new List<string> { "Items" });
            return _mapper.Map<List<OrderDto>>(orders);
        }

        public async Task<List<UserDto>> GetBuyers()
        {
            var users = await _unitOfWork.Users.GetAll(x => x.Type == UserType.Buyer);
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<UserDto>> GetDeclinedUsers()
        {
            var users = await _unitOfWork.Users.GetAll(x => x.VerificationStatus == VerificationStatus.Declined && x.Type == UserType.Seller);
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<UserDto>> GetVerifiedUsers()
        {
            var users = await _unitOfWork.Users.GetAll(x => x.VerificationStatus == VerificationStatus.Accepted && x.Type == UserType.Seller);
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<UserDto>> GetWaitingUsers()
        {
            var users = await _unitOfWork.Users.GetAll(x => x.VerificationStatus == VerificationStatus.Waiting && x.Type == UserType.Seller);
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task SetUserStatus(VerifyDto verifyDTO)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == verifyDTO.Id);
            if (user == null)
                throw new BadRequestException("User with this ID doesn't exist.");

            if (user.VerificationStatus != VerificationStatus.Waiting)
                throw new BadRequestException("Only verify waiting users");

            user.VerificationStatus = verifyDTO.VerificationStatus;
            _unitOfWork.Users.Update(user);

            string message = user.VerificationStatus == VerificationStatus.Accepted ? $"You have been verified.\r\nYou can now sell." : "Your verification has been denied.\r\nPlease contact administrators.";
            _ = Task.Run(async () => await _mailService.SendEmail("Verification status", message, user.Email!));
            await _unitOfWork.Save();
        }
    }
}
