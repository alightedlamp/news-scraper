import express from 'express'
import passport from 'passport'

import * as userController from '../../controllers/userController'

import { ensureAuthenticated } from '../../shared/helpers'

const router = express.Router()

// View Routes
// ////////////////////////////

router.get('/register', userController.renderRegister)
router.post('/register', userController.registerUser)

router.get('/login', userController.renderLogin)
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/user/login' }),
  userController.renderDashboard,
)

router.get('/logout', ensureAuthenticated, userController.logoutUser)

router.get('/', ensureAuthenticated, userController.renderDashboard)
router.get('/profile/:id', userController.renderProfile)

router.get('/edit/:id', ensureAuthenticated, userController.renderEdit)
// Do I need these if there are API routes for the same thing?
router.put('/edit/:id', ensureAuthenticated, userController.updateUserById)
router.delete('/delete/:id', ensureAuthenticated, userController.deleteUserById)

module.exports = router
