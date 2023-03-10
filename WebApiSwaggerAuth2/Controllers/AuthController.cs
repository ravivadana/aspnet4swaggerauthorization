using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace WebApiSwaggerAuth2.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class AuthController : ApiController
    {
        // GET: Auth
        public string Get(string company, string userName, string password)
        {
            return "12345";
        }

        public string post()
        {
            return "Bearer 12345";
        }
    }
}