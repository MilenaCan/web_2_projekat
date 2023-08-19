using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Web2_Projekat.Data;
using Web2_Projekat.Dto;
using Web2_Projekat.Enumerations;
using Web2_Projekat.Helper;
using Web2_Projekat.Interfaces;
using Web2_Projekat.Models;

namespace Web2_Projekat.Services
{
    public class UserService : IUserService
    {
        private readonly Web2_ProjekatContext _context;
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;

        public UserService(IMapper mapper, Web2_ProjekatContext context, IConfiguration configuration)
        {
            _mapper = mapper;
            _context = context;
            _secretKey = configuration.GetSection("SecretKey");

        }
        public async Task<UserDto> AddUser(UserDto newUserDto)
        {
            User newUser = _mapper.Map<User>(newUserDto);
            newUser.Password = HashPassword.Hashpassword(newUserDto.Password);
            await Console.Out.WriteLineAsync("Loznikaaa");
            await Console.Out.WriteLineAsync(newUser.Password); 
            _context.users.Add(newUser);
            await _context.SaveChangesAsync();

            return _mapper.Map<UserDto>(newUser);
        }

        public async Task<ResponseDto> Login(LoginDto loginUserDto)
        {
            User loginUser = new User();

            if (string.IsNullOrEmpty(loginUserDto.Email) && string.IsNullOrEmpty(loginUserDto.Password))
            {
                return new ResponseDto("Nije unesn email ili lozinka");
            }

            loginUser = await _context.users.FirstOrDefaultAsync(x => x.Email == loginUserDto.Email);

            if (loginUser == null)
                return new ResponseDto($"Korisnik sa emailom {loginUserDto.Email} ne postoji");

            //if (BCrypt.Net.BCrypt.Verify(loginUserDto.Password, loginUser.Password))
            //{
            //    List<Claim> claims = new List<Claim>();
            //    if (loginUser.UserType == UserType.Administrator)
            //        claims.Add(new Claim(ClaimTypes.Role, "administrator"));
            //    if (loginUser.UserType == UserType.Customer)
            //        claims.Add(new Claim(ClaimTypes.Role, "customer"));
            //    if (loginUser.UserType == UserType.Salesman)
            //        claims.Add(new Claim(ClaimTypes.Role, "salesman"));


            //    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey["Jwt:Key"]!));
            //    SigningCredentials signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            //    JwtSecurityToken tokenOptions = new JwtSecurityToken(
            //        _secretKey["Jwt:Issuer"],
            //        _secretKey["Jwt:Audience"],
            //        expires: DateTime.Now.AddMinutes(40),
            //        signingCredentials: signInCredentials
            //        );

            //    string token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                UserDto userDto = _mapper.Map<UserDto>(loginUser);

                ResponseDto responseDto = new ResponseDto("Uspesno ste se logovali na sistem");
                return responseDto;
           
        }

        public async Task<ResponseDto> Registration(UserDto newUser)
        {
            if(newUser.Password != newUser.ConfirmPassword)
            {
                return new ResponseDto("Potvrdjena loznika nije ispravna!");
            }
            foreach(User u in _context.users)
            {
                if(newUser.Email == u.Email)
                {
                    return new ResponseDto("Korisnik sa datom email adresom vec postoji.");
                }
            }
            UserDto registeredUser = await AddUser(newUser);
            ResponseDto response = new ResponseDto("uspjesno");
            return response;
        }
    }
}
