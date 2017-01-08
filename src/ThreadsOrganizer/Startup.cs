using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;

using ThreadsOrganizer.Data;
using ThreadsOrganizer.Data.Users;
using System.Threading;
using OpenIddict.Core;
using OpenIddict.Models;
using CryptoHelper;

namespace ThreadsOrganizer
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add a reference to the Configuration object for DI
            services.AddSingleton<IConfiguration>(c => { return Configuration; });

            // Add framework services.
            services.AddMvc();

            services.AddEntityFramework();

            // Add Identity Services & Stores
            services.AddIdentity<ApplicationUser, IdentityRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                config.Password.RequireNonAlphanumeric = false;
                config.Cookies.ApplicationCookie.AutomaticChallenge = false;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Add ApplicationDbContext.
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]);
                // Register the entity sets needed by OpenIddict.
                // Note: use the generic overload if you need to replace the default OpenIddict entities.
                options.UseOpenIddict();
            });

            // Register the OpenIddict services.
            services.AddOpenIddict()
                // Register the Entity Framework stores.
                .AddEntityFrameworkCoreStores<ApplicationDbContext>()

                // Enable the authorization, logout, token and userinfo endpoints.
                .EnableAuthorizationEndpoint("/api/connect/authorize")
                .EnableLogoutEndpoint("/api/connect/logout")
                .EnableTokenEndpoint("/api/connect/token")
                .EnableUserinfoEndpoint("/api/connect/userinfo")

                // Allow client applications to use the grant_type=password flow.
                .AllowPasswordFlow()
                // Enable support for both authorization & implicit flows
                .AllowAuthorizationCodeFlow()
                .AllowImplicitFlow()
                // Allow the client to refresh tokens.
                .AllowRefreshTokenFlow()

                // When request caching is enabled, authorization and logout requests
                // are stored in the distributed cache by OpenIddict and the user agent
                // is redirected to the same page with a single parameter (request_id).
                // This allows flowing large OpenID Connect requests even when using
                // an external authentication provider like Google, Facebook or Twitter.
                .EnableRequestCaching()

                // During development, you can disable the HTTPS requirement.
                .DisableHttpsRequirement()

                // Register a new ephemeral key, that is discarded when the application
                // shuts down. Tokens signed using this key are automatically invalidated.
                // This method should only be used during development.
                .AddEphemeralSigningKey();

            // Add ApplicationDbContext's DbSeeder
            services.AddSingleton<DbSeeder>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
            DbSeeder dbSeeder)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseDefaultFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = (context) =>
                {
                    // Disable caching for all static files
                    context.Context.Response.Headers["Cache-Control"] = Configuration["StaticFiles:Headers:Cache-Control"];
                    context.Context.Response.Headers["Pragma"] = Configuration["StaticFiles:Headers:Pragma"];
                    context.Context.Response.Headers["Expires"] = Configuration["StaticFiles:Headers:Expires"];
                }
            });

            app.UseOAuthValidation();

            // Add the AspNetCore.Identity middleware (required for external auth providers)
            // IMPORTANT: This must be placed *BEFORE* OpenIddict and any external provider's middleware
            app.UseIdentity();

            // Add external authentication middleware below.
            // To configure them please see http://go.microsoft.com/fwlink/?LinkID=532715
            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                AppId = Configuration["Authentication:Facebook:AppId"],
                AppSecret = Configuration["Authentication:Facebook:AppSecret"],
                CallbackPath = "/signin-facebook",
                Scope = { "email" }
            });
            app.UseGoogleAuthentication(new GoogleOptions()
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                ClientId = Configuration["Authentication:Google:ClientId"],
                ClientSecret = Configuration["Authentication:Google:ClientSecret"],
                CallbackPath = "/signin-google",
                Scope = { "email" }
            });

            // Add OpenIddict middleware
            // Note: UseOpenIddict() must be registered after app.UseIdentity() and the external social providers.
            app.UseOpenIddict();
            // Add the Jwt Bearer Header Authentication to validate Tokens
            app.UseJwtBearerAuthentication(new JwtBearerOptions()
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                RequireHttpsMetadata = false,
                Authority = Configuration["Authentication:OpenIddict:Authority"],
                TokenValidationParameters = new TokenValidationParameters()
                {
                    //IssuerSigningKey = JwtProvider.SecurityKey,
                    //ValidateIssuerSigningKey = true,
                    //ValidIssuer = JwtProvider.Issuer,
                    ValidateIssuer = false,
                    ValidateAudience = false
                }
            });

            app.UseMvc();

            // AutoMapper binding configuration
            //AutoMapper.Bind<Item, ItemViewModel>();

            // Seed the database with the sample applications.
            // Note: in a real world application, this step should be part of a setup script.
            //InitializeAsync(app.ApplicationServices, CancellationToken.None).GetAwaiter().GetResult();

            // Seed the Database (if needed)
            try
            {
                dbSeeder.SeedAsync().Wait();
            }
            catch (AggregateException e)
            {

                throw new Exception(e.ToString());
            }
        }

        /*private async Task InitializeAsync(IServiceProvider services, CancellationToken cancellationToken)
        {
            // Create a new service scope to ensure the database context is correctly disposed when this methods returns.
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                await context.Database.EnsureCreatedAsync();

                var manager = scope.ServiceProvider.GetRequiredService<OpenIddictApplicationManager<OpenIddictApplication>>();

                if (await manager.FindByClientIdAsync(Configuration["Authentication:OpenIddict:ClientId"], cancellationToken) == null)
                {
                    var application = new OpenIddictApplication
                    {
                        Id = Configuration["Authentication:OpenIddict:ApplicationId"],
                        DisplayName = Configuration["Authentication:OpenIddict:DisplayName"],
                        RedirectUri = Configuration["Authentication:OpenIddict:TokenEndPoint"],
                        LogoutRedirectUri = "/",
                        ClientId = Configuration["Authentication:OpenIddict:ClientId"],
                        ClientSecret = Crypto.HashPassword(Configuration["Authentication:OpenIddict:ClientSecret"]),
                        Type = OpenIddictConstants.ClientTypes.Public
                    };

                    await manager.CreateAsync(application, cancellationToken);
                }
            }
        }*/
    }
}
