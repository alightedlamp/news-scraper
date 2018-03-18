$(document).ready(() => {
  const convert = data =>
    data.reduce((o, item) => {
      o[item.name] = item.value.trim()
      return o
    }, {})

  const handleError = (err) => {
    let messageType = 'success'
    let msg = "The person who wrote this didn't handle this code!"
    if (err.status === 500) {
      messageType = 'danger'
      msg = 'Something went wrong in the application'
    } else if (err.status === 403) {
      messageType = 'warning'
      msg = 'You are not logged in!'
    }
    $('#flash-msg').html(`<div class="message ${messageType}"><strong>Error</strong>: ${msg}</div>`)
  }

  $('#registration-form').submit(function handleRegistration(e) {
    e.preventDefault()
    const data = convert($(this).serializeArray())
    $.post('/user/register', data)
      .done(() => {
        window.location.href = '/user'
      })
      .fail(err => handleError(err))
  })

  $('#login-form').submit(function handleLogin(e) {
    e.preventDefault()
    const data = convert($(this).serializeArray())
    $.post('/user/login', data)
      .done(() => {
        window.location.href = '/user'
      })
      .fail(err => handleError(err))
  })
})
