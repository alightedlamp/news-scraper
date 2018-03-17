// eslint-disable-next-line
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`User is authorized: ${req.isAuthenticated()}`)
    next()
  } else {
    throw { message: 'You are not authorized!', status: 403 }
  }
}
