'use strict';

$(document).ready(function () {
  var convert = function convert(data) {
    return data.reduce(function (o, item) {
      o[item.name] = item.value.trim();
      return o;
    }, {});
  };

  var handleError = function handleError(err) {
    var messageType = 'success';
    var msg = "The person who wrote this didn't handle this code!";
    if (err.status === 500) {
      messageType = 'danger';
      msg = 'Something went wrong in the application';
    } else if (err.status === 401 || err.status === 403) {
      messageType = 'warning';
      msg = 'You are not logged in!';
    }
    $('#flash-msg').html('<div class="message ' + messageType + '"><strong>Error</strong>: ' + msg + '</div>');
  };

  $('#registration-form').submit(function handleRegistration(e) {
    e.preventDefault();
    var data = convert($(this).serializeArray());
    $.post('/user/register', data).fail(function (err) {
      return handleError(err);
    });
  });

  $('#login-form').submit(function handleLogin(e) {
    e.preventDefault();
    var data = convert($(this).serializeArray());
    $.post('/user/login', data).done(function () {
      window.location.href = '/user';
    }).fail(function (err) {
      return handleError(err);
    });
  });
});
//# sourceMappingURL=index.js.map