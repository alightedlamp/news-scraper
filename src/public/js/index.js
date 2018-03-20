$(document).ready(() => {
  // Helpers
  // ////////////////////////////

  const convert = data =>
    data.reduce((o, item) => {
      o[item.name] = item.value.trim()
      return o
    }, {})

  const handleError = err =>
    $('#flash-msg').html(`<div class="message err-${err.status}"><strong>Uh oh!</strong> ${
      err.responseJSON.error
    }</div>`)

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
