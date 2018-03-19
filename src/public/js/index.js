$(document).ready(() => {
  // Helpers
  // ////////////////////////////

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
    } else if (err.status === 401 || err.status === 403) {
      messageType = 'warning'
      msg = 'You are not logged in!'
    }
    $('#flash-msg').html(`<div class="message ${messageType}"><strong>Error</strong>: ${msg}</div>`)
  }

  // User Management
  // ////////////////////////////

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

  // Front-end State Changes
  // ////////////////////////////

  $('.like-article').on('click', function handleLikeArticle() {
    const articleId = $(this).data('article-id')
    $.post(`/user/like_article/${articleId}`, articleId)
      .done(() => {
        // Animate the button or some shit
        console.log('article liked by user')
      })
      .fail(err => handleError(err))
  })

  $('.save-article').on('click', function handleSaveArticle() {
    const articleId = $(this).data('article-id')
    $.post(`/user/save_article/${articleId}`, articleId)
      .done(() => {
        // Animate the button or some shit
        console.log('article saved by user')
      })
      .fail(err => handleError(err))
  })
})
