const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

// DEFINE LOCAL STRATEGY HERE

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log(`User id when deserializing is: ${id}`);
  db.User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
  session({
    secret: 'secret kitty',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 604800 }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`App running on ${PORT}`));
