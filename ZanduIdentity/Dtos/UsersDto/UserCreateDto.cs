namespace ZanduIdentity.Dtos.UsersDto
{
    public class UserCreateDto
    {
        public string UserName { get; set; }

        public string Email { get; set; }
        
        public bool Password { get; set; }
    }
}