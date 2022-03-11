using System;
using System.Reflection;
using IdentityServer4;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using ZanduIdentity.Data;
using ZanduIdentity.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using IdentityModel;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ZanduIdentity.Data.Repositories.UserRepo;

namespace ZanduIdentity
{
    public class Startup
    {
        public IWebHostEnvironment Environment { get; }
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            Environment = environment;
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");

            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services.AddRouting(options => options.LowercaseUrls = true);

            services.AddControllersWithViews();
            
            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddScoped<IUserRepo, UserRepo>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            
            AddASPNetIdentityServices(services, connectionString);

            AddIdentityServer(services, connectionString, migrationsAssembly);

            AddExternalAuthProviders(services);
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// Called after ConfigureServices
        /// </summary>
        /// <param name="app">The application.</param>
        /// <param name="logger">The logger.</param>
        public void Configure(IApplicationBuilder app, ILogger<Startup> logger)
        {
            InitializeDatabase(app, logger);

            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }

            app.UseStaticFiles();

            app.UseRouting();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapDefaultControllerRoute(); });
        }

        private void InitializeDatabase(IApplicationBuilder app, ILogger<Startup> logger)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var applicationContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                applicationContext.Database.Migrate();

                serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();

                var configurationContext = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
                configurationContext.Database.Migrate();

                InitializeClients(configurationContext);
                InitializeResources(configurationContext);
                InitializeApiScopes(configurationContext);
                InitializeApiResources(configurationContext);

                InitializeAdminRole(serviceScope);
                InitializeStandardUserRole(serviceScope);
                InitializeAdminUser(serviceScope, logger);

                TestUserConfig.AddTestUsers(serviceScope);
            }
        }

        private static void InitializeApiScopes(ConfigurationDbContext context)
        {
            if (!context.ApiScopes.Any())
            {
                foreach (var resource in Config.ApiScopes)
                {
                    context.ApiScopes.Add(resource.ToEntity());
                }

                context.SaveChanges();
            }
        }
        
        private static void InitializeApiResources(ConfigurationDbContext context)
        {
            if (!context.ApiResources.Any())
            {
                foreach (var resource in Config.Apis)
                {
                    context.ApiResources.Add(resource.ToEntity());
                }

                context.SaveChanges();
            }
        }

        private static void InitializeResources(ConfigurationDbContext context)
        {
            if (!context.IdentityResources.Any())
            {
                foreach (var resource in Config.IdentityResources)
                {
                    context.IdentityResources.Add(resource.ToEntity());
                }

                context.SaveChanges();
            }
        }

        private static void InitializeClients(ConfigurationDbContext context)
        {
            if (!context.Clients.Any())
            {
                foreach (var client in Config.Clients)
                {
                    context.Clients.Add(client.ToEntity());
                }

                context.SaveChanges();
            }
        }

        private void InitializeAdminUser(IServiceScope scope, ILogger<Startup> logger)
        {
            var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var admin = userMgr.FindByNameAsync("admin").Result;
            if (admin == null)
            {
                admin = new ApplicationUser
                {
                    UserName = "admin",
                    Email = "admin@zanducommerce.com",
                    EmailConfirmed = true
                };

                var result = userMgr.CreateAsync(admin, "Password123!").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(
                    admin,
                    new[]
                    {
                        new Claim(JwtClaimTypes.Name, "Administrator"),
                        new Claim(JwtClaimTypes.GivenName, "Administrator"),
                        new Claim(JwtClaimTypes.FamilyName, "Administrator"),
                        new Claim(JwtClaimTypes.Email, "admin@abc.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                    }).Result;

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddToRolesAsync(admin, new[] { Roles.Administrator, Roles.StandardUser }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                logger.LogDebug("admin created");
            }
            else
            {
                logger.LogDebug("admin already exists");
            }
        }

        private void InitializeAdminRole(IServiceScope scope)
        {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var adminRole = roleManager.FindByNameAsync(Roles.Administrator).Result;
            if (adminRole != null)
            {
                return;
            }

            adminRole = new IdentityRole()
            {
                Name = Roles.Administrator,
                NormalizedName = Roles.Administrator.ToUpper()
            };
            var identityResult = roleManager.CreateAsync(adminRole).Result;
            if (!identityResult.Succeeded)
            {
                throw new Exception(identityResult.Errors.First().Description);
            }

            // TODO: Add custom claims at a later stage
            // identityResult = roleManager.AddClaimAsync(adminRole, new Claim(CustomClaimType.Permission, Permissions.All)).Result;
            // if (!identityResult.Succeeded)
            // {
            //     throw new Exception(identityResult.Errors.First().Description);
            // }
        }

        private void InitializeStandardUserRole(IServiceScope scope)
        {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var role = roleManager.FindByNameAsync(Roles.StandardUser).Result;
            if (role != null)
            {
                return;
            }

            role = new IdentityRole()
            {
                Name = Roles.StandardUser,
                NormalizedName = Roles.StandardUser.ToUpper()
            };
            var identityResult = roleManager.CreateAsync(role).Result;
            if (!identityResult.Succeeded)
            {
                throw new Exception(identityResult.Errors.First().Description);
            }

            // TODO: Add custom claims at a later stage
            // identityResult = roleManager.AddClaimAsync(role, new Claim(CustomClaimType.Permission, Permissions.ManageSelf)).Result;
            //
            // if (!identityResult.Succeeded)
            // {
            //     throw new Exception(identityResult.Errors.First().Description);
            // }
        }


        /// <summary>
        /// Adds the ASP net identity services. This is the persistence framework for storing users and roles.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <param name="connectionString">The connection string.</param>
        private void AddASPNetIdentityServices(IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlServer(
                    connectionString));

            services.AddIdentity<ApplicationUser, IdentityRole>(opt =>
                {
                    opt.Password.RequireDigit = false;
                    // opt.User.RequireUniqueEmail = true;
                    // opt.SignIn.RequireConfirmedEmail = true;
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddClaimsPrincipalFactory<MyUserClaimsPrincipalFactory>()
                .AddDefaultTokenProviders();
        }

        private static void AddIdentityServer(IServiceCollection services, string connectionString,
            string migrationsAssembly)
        {
            services.AddIdentityServer(
                    options =>
                    {
                        options.Events.RaiseErrorEvents = true;
                        options.Events.RaiseFailureEvents = true;
                        options.Events.RaiseInformationEvents = true;
                        options.Events.RaiseSuccessEvents = true;
                        // options.IssuerUri = identityServerOption.IssuerUri;
                        // options.PublicOrigin = identityServerOption.PublicOrigin;
                        options.EmitStaticAudienceClaim = true;
                        options.Discovery.CustomEntries.Add("local_api", "~/api");
                    })
                .AddDeveloperSigningCredential()
                .AddAspNetIdentity<ApplicationUser>()
                .AddConfigurationStore(
                    options =>
                    {
                        options.ConfigureDbContext = b => b.UseSqlServer(
                            connectionString,
                            sql => sql.MigrationsAssembly(migrationsAssembly));
                    })
                .AddOperationalStore(
                    options =>
                    {
                        options.ConfigureDbContext = b => b.UseSqlServer(
                            connectionString,
                            sql => sql.MigrationsAssembly(migrationsAssembly));

                        // This enables automatic token cleanup.
                        options.EnableTokenCleanup = true;
                        options.TokenCleanupInterval = 60;
                    });

            services.AddLocalApiAuthentication();
        }

        private static void AddExternalAuthProviders(IServiceCollection services)
        {
            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

                    // register your IdentityServer with Google at https://console.developers.google.com
                    // enable the Google+ API
                    // set the redirect URI to https://localhost:5001/signin-google
                    options.ClientId = "copy client ID from Google here";
                    options.ClientSecret = "copy client secret from Google here";
                });
        }
    }
}