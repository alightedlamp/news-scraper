import express from 'express'
import passport from 'passport'

import * as userController from '../../controllers/userController'

const router = express.Router()

// View Routes
// ////////////////////////////

router.get('/register', userController.renderRegister)
router.post('/register', userController.registerUser)

router.get('/login', userController.renderLogin)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) =>
  res.redirect('/'))

router.get('/logout', userController.logoutUser)

router.get('/', userController.renderDashboard)
router.get('/profile/:id', userController.renderProfile)

router.get('/edit/:id', userController.renderEdit)
// Do I need these if there are API routes for the same thing?
router.put('/edit/:id', userController.updateUserById)
router.delete('/delete/:id', userController.deleteUserById)

module.exports = router
