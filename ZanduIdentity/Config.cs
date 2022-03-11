using IdentityServer4.Models;
using System.Collections.Generic;
using IdentityServer4;

namespace ZanduIdentity
{
    public static class Config
    {
        public static IEnumerable<ApiResource> Apis = new List<ApiResource>
        {
            // local API
            new ApiResource
            {
                Name = IdentityServerConstants.LocalApi.ScopeName,
                Scopes =
                {
                    IdentityServerConstants.LocalApi.ScopeName
                }
            }
        };

        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("scope1"),
                new ApiScope("scope2"),
                new ApiScope("Zandu.Core", "Zandu Core API"),
                new ApiScope(IdentityServerConstants.LocalApi.ScopeName, "Identity Server Local API"),
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                // m2m client credentials flow client
                new Client
                {
                    ClientId = "m2m.client",
                    ClientName = "Client Credentials Client",

                    AllowAccessTokensViaBrowser = true,
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                    AllowedScopes =
                    {
                        IdentityServerConstants.LocalApi.ScopeName,
                        "scope1",
                        "Zandu.Core"
                    }
                },
                // interactive client using code flow + pkce
                new Client
                {
                    ClientId = "interactive",
                    ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256()) },

                    AllowedGrantTypes = GrantTypes.Code,

                    RedirectUris = { "https://localhost:44300/signin-oidc" },
                    FrontChannelLogoutUri = "https://localhost:44300/signout-oidc",
                    PostLogoutRedirectUris = { "https://localhost:44300/signout-callback-oidc" },

                    AllowOfflineAccess = true,
                    AllowedScopes = { "openid", "profile", "scope2", "Zandu.Core" }
                },
                // interactive ASP.NET Core MVC client
                new Client
                {
                    ClientId = "zandu.cms.mvc",
                    ClientSecrets = { new Secret("49C7A7E2-0D79-4A89-A3Z6-A32998FB86B0".Sha256()) },

                    AllowedGrantTypes = GrantTypes.Code,

                    // where to redirect to after login
                    RedirectUris = { "https://localhost:4001/signin-oidc" },

                    // where to redirect to after logout
                    PostLogoutRedirectUris =
                        { "https://localhost:4001/signout-callback-oidc" },

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "Zandu.Core"
                    }
                },
                new Client
                {
                    ClientId = "zandu.cms",
                    ClientName = "Zandu CMS Client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,

                    RedirectUris = { "http://localhost:3000/auth/callback" },
                    PostLogoutRedirectUris = { "http://localhost:3000/auth/logout" },
                    AllowedCorsOrigins = { "http://localhost:3000" },
                    AlwaysIncludeUserClaimsInIdToken = true,

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.LocalApi.ScopeName,
                        "Zandu.Core"
                    }
                },
                new Client
                {
                    ClientName = "Postman",
                    AllowOfflineAccess = true,
                    AllowedScopes = new []
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.LocalApi.ScopeName,
                        "Zandu.Core"
                    },
                    RedirectUris = new []
                    {
                        "https://www.getpostman.com/oauth2/callback"
                    },
                    Enabled = true,
                    ClientId = "545asf54-54fd445g-46514-fad456fda5j7h9gkf",
                    ClientSecrets = new[]
                    {
                        new Secret("NotASecret".Sha256())
                    },
                    PostLogoutRedirectUris = new []
                    {
                        "http://locahost:5002/signout-callback-oidc"
                    },
                    ClientUri = null,
                    AllowedGrantTypes = new []
                    {
                        GrantType.ResourceOwnerPassword
                    }
                }
            };
    }
}