import express from 'express'
import passport from 'passport'

import * as userController from '../../controllers/userController'

const router = express.Router()

router.get('/', userController.renderDashboard)
router.get('/profile/:id', userController.renderProfile)
router.get('/edit/:id', userController.renderEdit)

router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => {
  console.log('Rendering register page')
  res.render('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) =>
  res.redirect('/'))

module.exports = router
