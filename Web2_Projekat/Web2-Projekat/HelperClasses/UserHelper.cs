using Web2_Projekat.Dto;
using Web2_Projekat.Helper;
using Web2_Projekat.Models;

namespace Web2_Projekat.HelperClasses
{
    public class UserHelper
    {
        public static void UpdateUserFields(User user, UserDto userDto)
        {
            user.Username = userDto.Username;
            user.Email = userDto.Email;
            user.Password = HashPassword.Hashpassword(userDto.Password);
            user.Name = userDto.Name;
            user.Lastname = userDto.Lastname;
            user.DateOfBirth = userDto.DateOfBirth;
            user.Address = userDto.Address;
            user.Password = userDto.Photo;
            user.VerificationStatus = userDto.VerificationStatus;
        }

        public static bool IsUserFieldsValid(UserDto userDto)
        {
            if (string.IsNullOrEmpty(userDto.Username))
                return false;
            if (string.IsNullOrEmpty(userDto.Email))
                return false;
            if (string.IsNullOrEmpty(userDto.Password))
                return false;
            if (string.IsNullOrEmpty(userDto.Name))
                return false;
            if (string.IsNullOrEmpty(userDto.Lastname))
                return false;
            if (userDto.DateOfBirth > DateTime.Now) 
                return false;
            if (string.IsNullOrEmpty(userDto.Address))
                return false;
            //if (userDto.CenaDostave == 0 && userDto.TipKorisnika == TipKorisnika.Prodavac)
            //    return false;

            return true;
        }
    }
}
