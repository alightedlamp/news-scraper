'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderRegister = exports.renderLogin = exports.renderEdit = exports.renderProfile = exports.renderDashboard = exports.deleteUserById = exports.updateUserById = exports.registerUser = exports.logoutUser = exports.getUserById = exports.getUserData = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// User handlers
// ////////////////////////////

var getUserData = exports.getUserData = function getUserData(user) {
  if (user.authenticated) {
    // Get saved articles, favorites, and private stats
  } else {
      // Return favorites and public info
    }
};

// API route controllers
// ////////////////////////////

var getUserById = exports.getUserById = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getUserData({ user_id: req.user._id, authenticated: false });

          case 3:
            data = _context.sent;

            req.json(data);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            next(_context.t0);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getUserById(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var logoutUser = exports.logoutUser = function logoutUser(req, res) {
  req.logout();
  res.redirect('/');
};

var registerUser = exports.registerUser = function registerUser(req, res, next) {
  return _User2.default.register(new _User2.default({ username: req.body.username }), req.body.password).then(function () {
    _passport2.default.authenticate('local', { failureRedirect: '/user/login' })(req, res, function () {
      return res.redirect('/');
    });
  }).catch(function (err) {
    return next(err);
  });
};

var updateUserById = exports.updateUserById = function updateUserById(req, res, next) {
  return _User2.default.update(req.body).then(function (doc) {
    return res.json(doc);
  }).catch(function (err) {
    return next(err);
  });
};

var deleteUserById = exports.deleteUserById = function deleteUserById(req, res, next) {
  return _User2.default.delete({ _id: req.user._id }).then(function () {
    return res.sendStatus(200);
  }).catch(function (err) {
    return next(err);
  });
};

// HTML route controllers
// ////////////////////////////

var renderDashboard = exports.renderDashboard = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getUserData({ user_id: req.user._id, authenticated: true });

          case 2:
            data = _context2.sent;

            res.render('dashboard', { data: data, user: req.username });

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function renderDashboard(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var renderProfile = exports.renderProfile = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var data;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getUserData({ user_id: req.user._id, authenticated: false });

          case 2:
            data = _context3.sent;

            res.render('profile', { data: data, user: req.user.username });

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function renderProfile(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var renderEdit = exports.renderEdit = function renderEdit(req, res) {
  res.render('edit', { user: req.user.username });
};
var renderLogin = exports.renderLogin = function renderLogin(req, res) {
  if (req.user) {
    renderProfile();
  } else {
    res.render('login');
  }
};
var renderRegister = exports.renderRegister = function renderRegister(req, res) {
  return res.render('register');
};
//# sourceMappingURL=userController.js.map