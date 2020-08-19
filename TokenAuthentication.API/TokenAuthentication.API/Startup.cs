using System;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using TokenAuthentication.API.Infrastructure;
using TokenAuthentication.API.Models;
using TokenAuthentication.API.Providers;

[assembly: OwinStartup(typeof(TokenAuthentication.API.Startup))]
namespace TokenAuthentication.API
{
    public class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static GoogleOAuth2AuthenticationOptions googleAuthOptions { get; private set; }
        public static FacebookAuthenticationOptions facebookAuthOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            #region Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(AuthContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);
            #endregion

            ConfigureOAuthTokenGeneration(app);

            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            app.UseWebApi(config);
        }

        /// <summary>
        /// Add token based authentication to owin pipeline
        /// </summary>
        /// <param name="app"></param>
        private void ConfigureOAuthTokenGeneration(IAppBuilder app)
        {
            //use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(Microsoft.AspNet.Identity.DefaultAuthenticationTypes.ExternalCookie);
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            //Authentication refresh token middlware
            app.UseOAuthAuthorizationServer(new Microsoft.Owin.Security.OAuth.OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/Token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(24),
                Provider = new CustomAuthorisationServerProvider(),
                RefreshTokenProvider = new CustomRefreshTokenProvider()
            });
            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);


            //external authentication middleware
            //Configure Google External Login
            //googleAuthOptions = new GoogleOAuth2AuthenticationOptions()
            //{
            //    ClientId = "654004775125-im2peldn1j10339eof34arvc3adhbe3f.apps.googleusercontent.com",
            //    ClientSecret = "BWd9_RqxNTmi21lsZ61L7O_1",
            //    Provider = new GoogleAuthProvider()
            //};
            //app.UseGoogleAuthentication(googleAuthOptions);

            //// Configure Facebook External Login 
            //facebookAuthOptions = new FacebookAuthenticationOptions()
            //{
            //    AppId = "340208313293831",
            //    AppSecret = "dbc3882891be30825b5b248fc14da3ab",
            //    Provider = new FacebookAuthProvider()
            //};
            //app.UseFacebookAuthentication(facebookAuthOptions);
        }
    }
}