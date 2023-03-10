(function () {
    var $swaggerCustomeContainer = $(".swagger-section");
    $swaggerCustomeContainer.append(`
            <div id="myModal" class="modal">
               <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close btnClose" data-dismiss="modal">&times;</button>
                        <h1 class="modal-title">Login</h1>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="CompanyName">Company</label>
                            <input type="text" class="form-control" id="CompanyName" aria-describedby="CompanyNameHelp" placeholder="Enter Company" required>
                            <span id="companychweck" style="color: red;">*</span>
                          </div>
                        <div class="form-group">
                            <label for="UserName">User Name</label>
                            <input type="text" class="form-control" id="UserName" placeholder="User Name" required>
                            <span id="usernamechweck" style="color: red;">*</span>
                        </div>
                        <div class="form-group">
                            <label for="Password">Password</label>
                            <input type="password" class="form-control" id="Password" placeholder="Password" required>
                            <span id="passwordchweck" style="color: red;">*</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id="btnAuthorize" class="btn btn-success">Submit</button>
                        <button type="button" class="btn btn-danger btnClose" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
            </div>
        `)
    $(function () {
        function validateCompany(input) {
            if (input.length == "") {
                return false;
            } else {
                return true;
            }
        }
        $("#myModal").hide();
        $("#input_apiKey").click(function () {
            $("#myModal").show();
        })
        $(".btnClose").click(function () {
            $("#myModal").hide();
        });
      
        $("#btnAuthorize").click(function () {
            var company = $("#CompanyName").val();            
            var userName = $("#UserName").val();
            var password = $("#Password").val();
            var isCompanyValid = validateCompany(company);
            var isUserNameValid = validateCompany(userName);
            var isPasswordValid = validateCompany(password);
            if (isCompanyValid) { $("#companychweck").hide() } else { $("#companychweck").show(); }
            if (isUserNameValid) { $("#usernamechweck").hide() } else { $("#usernamechweck").show(); }
            if (isPasswordValid) { $("#passwordchweck").hide() } else { $("#passwordchweck").show(); }
            if (isCompanyValid && isUserNameValid && isPasswordValid) {
                $.ajax({
                    type: "GET",
                    url: "/api/Auth?company=" + company + "&userName=" + userName + "&password=" + password,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var token = response;
                        $("#input_apiKey").val(token);
                        $("#explore").click();
                        $(".close").click();
                        $("#myModal").remove();
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    error: function (response) {
                        alert(response);
                    }
                });
            }
        });
    });
})();