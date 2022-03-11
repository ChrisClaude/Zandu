using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using ZanduIdentity.Models;

namespace ZanduIdentity
{
    public class TestUserConfig
    {
        public static void AddTestUsers(IServiceScope scope)
        {
            if (AddTestUsers())
            {
                Log.Debug("Start adding test users.");
                var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                AddUser(userMgr, "alice", "Pass123$", "Alice", "Smith");
                AddUser(userMgr, "bob", "Pass123$", "Bob", "Smith");
                Log.Debug("Done adding test users.");
            }
        }

        private static bool AddTestUsers()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            var configuration = builder.Build();
            bool addTestUsers = configuration.GetValue<bool>("AddTestUsers");
            return addTestUsers;
        }

        private static void AddUser(UserManager<ApplicationUser> userMgr, string userName, string password, string givenName,
            string familyName)
        {
            var user = userMgr.FindByNameAsync(userName).Result;
            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = userName,
                    Email = $"{userName}@zanducommerce.com",
                    EmailConfirmed = true
                };
                var result = userMgr.CreateAsync(user, password).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(user, new[]{
                        new Claim(JwtClaimTypes.Name, $"{givenName} {familyName}"),
                        new Claim(JwtClaimTypes.GivenName, givenName),
                        new Claim(JwtClaimTypes.FamilyName,  familyName),
                        new Claim(JwtClaimTypes.Email, $"{givenName}.{familyName}@zanducommerce.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                 }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
                result = userMgr.AddToRoleAsync(user, Roles.StandardUser).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
                Log.Debug($"{userName} created");
            }
            else
            {
                Log.Debug($"{userName} already exists");
            }
        }
    }
}
