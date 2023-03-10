using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace WebApiSwaggerAuth2
{
    public class AuthAttribute: AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);
        }
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            try
            {
                var queryString = actionContext.Request
                                    .GetQueryNameValuePairs()
                                    .ToDictionary(x => x.Key, x => x.Value);

                return queryString.FirstOrDefault().Value.Contains("12345");

                IEnumerable<string> headerValues = actionContext.Request?.Headers?.GetValues("token");
                var id = headerValues.FirstOrDefault();
                var isAuthorized = true;
                isAuthorized = id == "12345";
                return isAuthorized;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}