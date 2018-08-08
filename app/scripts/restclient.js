$(document).ready(function() {
  // login user
  login = function() {
    // extract username/passowrd from form
    var data = {
      userName: $('input[id="username"]').val(),
      passWord: $('input[id="password"]').val()
    };
    var url = constants.apiUrl.accounts;
    var queryParam = {};
    var options = {};
    options.success = function(response) {
      var ID = response.id;
      var accountName = response.name;
      if (ID == 0) {
        window.localStorage.loggedIn = false;
        loginStatus("Fail");
      } else {
        window.localStorage.accountId = ID;
        window.localStorage.name = accountName;
        window.localStorage.loggedIn = true;
        loginStatus("Success");
      }
    };
    options.failure = function(response) {
      resetForm("#loginForm");
    };
    post(url, queryParam, data, options);
  };

  // handle click events
  $("#loginbtn").click(function() {
    login();
  });
  if (window.localStorage.getItem("loggedIn")) {
    loadContactsList();
  }
});

function loginStatus(status) {
  if (status == "Fail") {
    $("#loginStatus")
      .show()
      .html(
        '<div class="alert alert-warning">Login <strong>Failed!</strong></div>'
      )
      .fadeOut(2000);
    resetForm("#loginForm");
  }
  if (status == "Success") {
    $("#loginStatus")
      .show()
      .html(
        '<div class="alert alert-success">Login <strong>Succeeded!</strong></div>'
      )
      .fadeOut(2000);
    loadContactsPage();
  }
}

function loadContactsList() {
  $.get(
    constants.apiUrl.accounts +
      window.localStorage.accountId +
      "/contacts/list",
    function(response) {
      var contactList = response;
      console.log(response);
      if (response.length == 0) {
        console.log("No List");
      } else {
        window.localStorage.contactlist = contactList;
        $("#table-body").html(generateHTMLforTable(response));
      }
    }
  );
}

function loadContactsPage() {
  window.open("Contacts.html", "_self");
}

function resetForm(element) {
  $(element).trigger("reset");
}

function generateHTMLforTable(data) {
  tableHTML = "";
  addresses = [];
  for (var i = 0; i < data.length; i++) {
    tableHTML += "<tr>";
    // tableHTML += '<td>' + data[i]['id'] + '</td>';
    tableHTML +=
      "<td>" + data[i]["firstName"] + " " + data[i]["lastName"] + "</td>";
    tableHTML += "<td>" + data[i]["emailAddress"] + "</td>";
    var contact = data[i];
    var contactAddress = contact.contactAddresses[0];
    var address =
      contactAddress.streetAddress +
      "," +
      contactAddress.city +
      "," +
      contactAddress.state +
      "," +
      contactAddress.country;
    tableHTML += "<td>" + address + "</td>";
    tableHTML +=
      "<td>" +
      '<a href="#" id="edit" data-id=' +
      contact.id +
      ' onClick="loadupdatePage()">Edit</a>' +
      "  ||  " +
      '<a href="#" id="delete" data-id=' +
      contact.id +
      ' onClick="deleteContact()">Delete</a>' +
      "</td>";
    tableHTML += "</tr>";
    addresses[i] = address;
  }
  window.localStorage.addresses = addresses;
  return tableHTML;
}
