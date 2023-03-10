using System.Web.Http;
using WebActivatorEx;
using WebApiSwaggerAuth2;
using Swashbuckle.Application;
using System;
using System.Reflection;
using System.IO;
using Swashbuckle.Swagger;
using System.Web.Http.Description;
using System.Collections.Generic;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace WebApiSwaggerAuth2
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            var thisAssembly = typeof(SwaggerConfig).Assembly;

            GlobalConfiguration.Configuration
                .EnableSwagger(c =>
                    {
                        c.SingleApiVersion("v1", "Super duper API");

                        var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
                        var fileName = Assembly
                            .GetExecutingAssembly()
                            .GetName()
                            .Name + ".xml";
                        var commentsFile = Path.Combine(baseDirectory, "bin", fileName);
                        c.IncludeXmlComments(commentsFile);
                    }).EnableSwaggerUi(c=>
                    {
                        c.InjectStylesheet(thisAssembly, "WebApiSwaggerAuth2.Content.model.css");
                        c.InjectJavaScript(thisAssembly, "WebApiSwaggerAuth2.Content.Authorization.js");
                    });
        }
    }
}
