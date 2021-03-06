// eslint-disable-next-line
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).redirect('/user/login')
  }
}
