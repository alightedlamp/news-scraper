import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import compression from 'compression'
import session from 'express-session'
import passport from 'passport'
import bodyParser from 'body-parser'
import expressHandlebars from 'express-handlebars'

import { Strategy } from 'passport-local'

import { PORT, MONGODB_URI } from './shared/config'

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)

const db = mongoose.connection

// Bind connection to error event (to get notification of connection errors)
// eslint-disable-next-line
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express()

passport.use(new Strategy((username, password, done) => {
  db.User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false)
    }
    if (!user.verifyPassword(password)) {
      return done(null, false)
    }
    return done(null, user)
  })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  db.User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null))
})

app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
  }),
)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(session({
  secret: 'secret kitty',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 604800 },
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())
app.use(require('./routes'))

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Render the error page
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    status: err.status,
  })
})

// eslint-disable-next-line
app.listen(PORT, () => console.log(`App running on ${PORT}`))