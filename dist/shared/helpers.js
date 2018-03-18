'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// eslint-disable-next-line
var ensureAuthenticated = exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render('login', { error: 'Please log in!' });
  }
};
//# sourceMappingURL=helpers.js.map