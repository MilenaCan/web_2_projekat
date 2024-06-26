﻿using AutoMapper;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Web2_Projekat.Dto;
using Web2_Projekat.Exceptions;
using Web2_Projekat.Interfaces;
using Web2_Projekat.Interfaces.IServices;
using Web2_Projekat.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime;
using System.Security.Claims;
using System.Text;
using BC = BCrypt.Net;

namespace Web2_Projekat.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;

        public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration, IMapper mapper, IMailService mailService)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _mapper = mapper;
            _mailService = mailService;
        }

        private string GetToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username!),
                new Claim(ClaimTypes.Role, user.Type.ToString()),
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email!),
            };
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> Login(LoginDto loginDTO)
        {
            var user = await _unitOfWork.Users.Get(x => x.Email == loginDTO.Email);
            if (user == null)
                throw new NotFoundException($"Incorrect email. Try again.");

            if (!BC.BCrypt.Verify(loginDTO.Password, user.Password))
                throw new BadRequestException("Invalid password");

            if (user.Type == UserType.Seller)
            {
                if (user.VerificationStatus == VerificationStatus.Waiting)
                    throw new BadRequestException("You are not verified. Wait to be verified by administrators.");
                if (user.VerificationStatus == VerificationStatus.Declined)
                    throw new BadRequestException("You were declined by administrators. Contact to see why.");
            }

            return GetToken(user);
            
        }

        public async Task Register(RegisterDto registerDTO)
        {
            if (registerDTO.Type == UserType.Administrator)
                throw new UnauthorizedException("Can't register admin user!");

            if ((await _unitOfWork.Users.Get(x => x.Email == registerDTO.Email)) != null)
                throw new BadRequestException("Email already exists.");

            if ((await _unitOfWork.Users.Get(x => x.Username == registerDTO.Username)) != null)
                throw new BadRequestException("Username already exists.");

            registerDTO.Password = BC.BCrypt.HashPassword(registerDTO.Password);

            var user = _mapper.Map<User>(registerDTO);
            user.VerificationStatus = user.Type == UserType.Seller ? VerificationStatus.Waiting : VerificationStatus.Accepted;

            if (registerDTO.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    registerDTO.ImageFile.CopyTo(ms);
                    user.Image = ms.ToArray();
                }
            }

            if (user.Type == UserType.Seller)
                await _mailService.SendEmail("Account verification", "Sorry to keep you waiting, the first available administrator will verify your account.", user.Email!);
            await _unitOfWork.Users.Insert(user);
            await _unitOfWork.Save();
        }

        public async Task<string> GoogleSignIn(TokenDto token)
        {
            var str = _configuration["Google:ClientID"]!;
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { _configuration["Google:ClientID"]! }
            };

            var data = await GoogleJsonWebSignature.ValidateAsync(token.Token, settings);

            var user = await _unitOfWork.Users.Get(x => x.Email == data.Email);
            if (user != null)
                return GetToken(user);

            user = new User
            {
                Email = data.Email,
                FullName = $"{data.GivenName} {data.FamilyName}",
                Birthday = DateTime.Now,
                Address = $"No address",
                Password = BC.BCrypt.HashPassword("123"),
                VerificationStatus = VerificationStatus.Waiting,
                Type = UserType.Buyer,
                Username = data.GivenName + (new Random().Next() / 100000).ToString(),
            };

            if (data.Picture != null)
                Convert.TryFromBase64String(data.Picture, user.Image, out int b);

            await _unitOfWork.Users.Insert(user);
            await _unitOfWork.Save();

            return GetToken(user);
        }
    }
}
