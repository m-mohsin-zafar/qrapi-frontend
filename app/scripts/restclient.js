$(document).ready(function() {
  
  //User Login & Verification
  $("#loginbtn").click(function() {
    var data = {
      userName: $('input[id="username"]').val(),
      passWord: $('input[id="password"]').val()
    };
    $.ajax({
      url: "http://localhost:8080/qrapi/api/v1/accounts",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",

      success: function(response) {
        var ID = response.id;
        var accountName = response.name;
        window.localStorage.accountId = ID;
        window.localStorage.name = accountName;
        if (ID == null) {
          showLoginFailureError();
          console.log("Id is null");
        } else {
          console.log("ID: " + ID);
          window.open("Contacts.html", "_self");
        }
      },
      error: function(result) {
        alert("Oops Something went wrong...");
      }
    });
    $.get({
        url: "http://localhost:8080/qrapi/api/v1/accounts"+accountId+"/contacts/list",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
  
        success: function(response) {
          var contactList = response;
          console.log(response);
          window.localStorage.contactlist = contactList;
          window.localStorage.name = accountName;
          if (ID == null) {
            showLoginFailureError();
            console.log("Id is null");
          } else {
            console.log("ID: " + ID);
            window.open("Contacts.html", "_self");
          }
        },
        error: function(result) {
          alert("Oops Something went wrong...");
        }
      });
  });

  // updateAccountInfo();
});

function showLoginFailureError() {
  document.getElementById("loginStatus").style.display = "block";
}
