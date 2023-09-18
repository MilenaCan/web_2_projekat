namespace Web2_Projekat.Interfaces.IServices
{
    public interface IMailService
    {
        public Task SendEmail(string subject, string body, string receiver);
    }
}
