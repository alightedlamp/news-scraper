import Promise from 'promise-polyfill'

import User from '../models/User'

// User handlers
// ////////////////////////////

export const getUserData = (user) => {
  if (user.authenticated) {
    // Get saved articles, favorites, and private stats
  } else {
    // Return favorites and public info
  }
}

// API route controllers
// ////////////////////////////

export const getUserById = async (req, res, next) => {
  try {
    const data = await getUserData({ user_id: req.params.id, authenticated: false })
    req.json(data)
  } catch (err) {
    next(err)
  }
}
export const logoutUser = (req, res) => {
  req.logout()
  res.redirect('/')
}
export const registerUser = (req, res, next) =>
  User.register(new User({ username: req.body.username }), req.body.password, (err) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
export const updateUserById = (req, res, next) =>
  User.update(req.body, (err, doc) => {
    if (err) {
      next(err)
    } else {
      res.json(doc)
    }
  })
export const deleteUserById = (req, res, next) =>
  User.delete({ _id: req.params.id }, (err) => {
    if (err) {
      next(err)
    } else {
      res.send(200)
    }
  })

// HTML route controllers
// ////////////////////////////

export const renderLogin = (req, res) => res.render('login')
export const renderRegister = (req, res) => res.render('register')
export const renderDashboard = (req, res) => {
  const data = getUserData({ user_id: req.user.id, authenticated: true })
  res.render('dashboard', { data })
}
export const renderProfile = (req, res) => {
  const data = getUserData({ user_id: req.params.id, authenticated: false })
  res.render('profile', { data })
}
export const renderEdit = (req, res) => {
  res.render('edit', { user: req.user })
}
