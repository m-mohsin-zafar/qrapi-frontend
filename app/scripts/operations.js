get = function(url, queryParam, options) {};

post = function(url, queryParam, data, options) {
  $.ajax({
    url: url + $.param(queryParam),
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false,
    success: function(response) {
      if (options && options.success) {
        options.success(response);
      }
    },
    error: function(result) {
      if (options && options.failure) {
        options.failure(result);
      }
    }
  });
};

put = function(url, queryParam, data, options) {};

remove = function(url, queryParam, data, options) {};
