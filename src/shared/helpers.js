// eslint-disable-next-line
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.render('login', { error: 'Please log in!' })
  }
}
