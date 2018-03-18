'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _User = require('./models/User');

var _User2 = _interopRequireDefault(_User);

var _config = require('./shared/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;
_mongoose2.default.connect(_config.MONGODB_URI);

var db = _mongoose2.default.connection;

// Bind connection to error event (to get notification of connection errors)
// eslint-disable-next-line
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = (0, _express2.default)();

_passport2.default.use(_User2.default.createStrategy());
_passport2.default.serializeUser(_User2.default.serializeUser());
_passport2.default.deserializeUser(_User2.default.deserializeUser());

app.engine('handlebars', (0, _expressHandlebars2.default)({
  defaultLayout: 'main',
  layoutsDir: _path2.default.join(__dirname, 'views/layouts'),
  partialsDir: _path2.default.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', _path2.default.join(__dirname, 'views'));

app.use((0, _expressSession2.default)({
  secret: 'secret kitty',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 604800 }
}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use((0, _compression2.default)());

app.use('/', _express2.default.static(_path2.default.join(__dirname, '/public')));
app.use(require('./routes'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err);

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    status: err.status
  });
});

// eslint-disable-next-line
app.listen(_config.PORT, function () {
  return console.log('App running on ' + _config.PORT);
});
//# sourceMappingURL=server.js.map