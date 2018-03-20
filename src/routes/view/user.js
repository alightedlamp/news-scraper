import express from 'express'
import passport from 'passport'

import * as userController from '../../controllers/userController'

import { ensureAuthenticated } from '../../shared/helpers'

const router = express.Router()

// View Routes
// ////////////////////////////

// Authorization routes / handlers
router.get('/register', userController.renderRegister)
router.post('/register', userController.registerUser, userController.renderDashboard)
router.get('/login', userController.renderLogin)

// Validation and success routng are handled client-side
// passport.authenticate takes an additional failureRedirect object arg for
// server-side validation
router.post('/login', passport.authenticate('local'), userController.renderDashboard)
router.get('/logout', ensureAuthenticated, userController.logoutUser)

// Page render routes
router.get('/', ensureAuthenticated, userController.renderDashboard)
router.get('/profile/:id', userController.renderProfile)
router.get('/edit/:id', ensureAuthenticated, userController.renderEdit)

// User-actions
router.post('/save_article/:articleId', ensureAuthenticated, userController.handleSaveArticle)
router.post('/like_article/:articleId', ensureAuthenticated, userController.handleLikeArticle)
router.put('/edit/:id', ensureAuthenticated, userController.updateUserById)
router.delete('/delete/:id', ensureAuthenticated, userController.deleteUserById)

module.exports = router
