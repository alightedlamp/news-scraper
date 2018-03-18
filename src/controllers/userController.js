import passport from 'passport'
import User from '../models/User'
import SavedArticle from '../models/SavedArticle'
import Article from '../models/Article'

// User handlers
// ////////////////////////////

export const getUserData = (user) => {
  if (user.authenticated) {
    // Get saved articles, favorites, and private stats
  } else {
    // Return favorites and public info
  }
}
export const saveUserArticle = body => SavedArticle.create(body)
export const likeUserArticle = () =>
  // Update num_likes on article
  // Save liked status on User
  Article.update()

// API route controllers
// ////////////////////////////

export const getUserById = async (req, res, next) => {
  try {
    const data = await getUserData({ user_id: req.user._id, authenticated: false })
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
  User.register(new User({ username: req.body.username }), req.body.password)
    .then(() => {
      passport.authenticate('local', { failureRedirect: '/user/login' })(req, res, () =>
        res.redirect('/'))
    })
    .catch(err => next(err))

export const updateUserById = (req, res, next) =>
  User.update(req.body)
    .then(doc => res.json(doc))
    .catch(err => next(err))

export const deleteUserById = (req, res, next) =>
  User.delete({ _id: req.user._id })
    .then(() => res.sendStatus(200))
    .catch(err => next(err))

// HTML route controllers
// ////////////////////////////

// AUTHENTICATED ROUTES
export const renderDashboard = async (req, res) => {
  const data = await getUserData({ user_id: req.user._id, authenticated: true })
  res.render('dashboard', { data, user: req.user })
}
export const renderEdit = (req, res) => {
  res.render('edit', { user: req.user.username })
}
export const handleSaveArticle = async (req, res, next) => {
  try {
    await saveUserArticle({
      user_id: req.user.id,
      article_id: req.params.articleId,
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
export const handleLikeArticle = async (req, res, next) => {
  try {
    await likeUserArticle({
      user_id: req.user.id,
      article_id: req.params.articleId,
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

// PUBLIC ROUTES
export const renderProfile = async (req, res) => {
  const data = await getUserData({ user_id: req.params.id, authenticated: false })
  res.render('profile', { data, user: req.user.username })
}
export const renderLogin = (req, res) => {
  if (req.user) {
    renderProfile()
  } else {
    res.render('login')
  }
}
export const renderRegister = (req, res) => res.render('register')
