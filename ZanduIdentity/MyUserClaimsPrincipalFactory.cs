// <summary>
//   This custom extension allows us to add the roles as claims.
// </summary>


using ZanduIdentity.Models;

namespace ZanduIdentity
{
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Options;
    
    
    /// <summary>
    /// This custom extension allows us to add the roles as claims.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Identity.UserClaimsPrincipalFactory{Microsoft.AspNetCore.Identity.IdentityUser}" />
    public class MyUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<ApplicationUser>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MyUserClaimsPrincipalFactory"/> class.
        /// </summary>
        /// <param name="userManager">The <see cref="T:Microsoft.AspNetCore.Identity.UserManager`1" /> to retrieve user information from.</param>
        /// <param name="optionsAccessor">The configured <see cref="T:Microsoft.AspNetCore.Identity.IdentityOptions" />.</param>
        public MyUserClaimsPrincipalFactory(
            UserManager<ApplicationUser> userManager,
            IOptions<IdentityOptions> optionsAccessor)
                : base(userManager, optionsAccessor)
        {
        }

        /// <summary>
        /// Generate the claims for a user.
        /// </summary>
        /// <param name="user">The user to create a <see cref="T:System.Security.Claims.ClaimsIdentity" /> from.</param>
        /// <returns>
        /// The <see cref="T:System.Threading.Tasks.Task" /> that represents the asynchronous creation operation, containing the created <see cref="T:System.Security.Claims.ClaimsIdentity" />.
        /// </returns>
        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(ApplicationUser user)
        {
            var identity = await base.GenerateClaimsAsync(user);
            var roles = await UserManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, role));
                identity.AddClaim(new Claim("role", role));
            }

            return identity;
        }
    }
}