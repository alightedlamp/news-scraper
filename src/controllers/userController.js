import passport from 'passport'
import mongoose from 'mongoose'
import User from '../models/User'
import Article from '../models/Article'

// User handlers
// ////////////////////////////

export const convert = arr => arr.map(mongoose.Types.ObjectId)
export const getUserData = (user) => {
  // Get saved articles where user ID
  if (user.authenticated) {
    return User.find({ _id: user.user_id }, 'saved_articles').exec()
  }
  // Return favorites and public info
}

export const saveUserArticle = userObj =>
  User.findOneAndUpdate(
    { _id: userObj.user_id },
    { $push: { saved_articles: userObj.article_id } },
    { new: true },
  )

export const likeUserArticle = userObj =>
  User.findOneAndUpdate(
    { _id: userObj.user_id },
    { $push: { liked_articles: userObj.article_id } },
    { new: true },
  )

// API route controllers
// ////////////////////////////

export const getUserById = async (req, res, next) => {
  try {
    const data = await getUserData({ user_id: req.user._id, authenticated: false })
    res.json(data)
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
    .then(() => passport.authenticate('local')(req, res, next))
    .catch(err => res.status(500).json({ error: err.message }))

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
  const savedArticles = await getUserData({ user_id: req.user._id, authenticated: true })
    .then(ids => Article.find({ _id: { $in: convert(ids[0].saved_articles) } }).exec())
    .then(docs => docs)
    .catch(err => res.status(500))
  res.render('dashboard', { saved_articles: savedArticles, user: req.user })
}

export const renderEdit = (req, res) => res.render('edit', { user: req.user.username })

// Saving and liking articles are handled with AJAX client-side
export const handleSaveArticle = async (req, res, next) => {
  try {
    await saveUserArticle({
      user_id: req.user.id,
      article_id: req.params.articleId,
    })
    res.sendStatus(200)
  } catch (err) {
    res.status(500).json({ error: 'Could not save article! Please try again' })
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
    res.status(500).json({ error: 'Could not like article! Please try again' })
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
