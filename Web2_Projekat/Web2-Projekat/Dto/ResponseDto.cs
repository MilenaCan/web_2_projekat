namespace Web2_Projekat.Dto
{
    public class ResponseDto
    {
        public string Token { get; set; }
        public UserDto UserDto { get; set; }

        public string Result { get; set; }


        public ResponseDto()
        {
            Token = "";
            Result = "" ;
            UserDto = null;
        }
        public ResponseDto(string reult){
            Token = "";
            UserDto = null;
            Result = reult;
        }
        public ResponseDto(string token,string reult, UserDto userDto)
        {
            Token = token;
            UserDto = userDto;
            Result = reult;
        }
    }
}
