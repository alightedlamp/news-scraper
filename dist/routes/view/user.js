'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _userController = require('../../controllers/userController');

var userController = _interopRequireWildcard(_userController);

var _helpers = require('../../shared/helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// View Routes
// ////////////////////////////

router.get('/register', userController.renderRegister);
router.post('/register', userController.registerUser);

router.get('/login', userController.renderLogin);
router.post('/login', _passport2.default.authenticate('local', { failureRedirect: '/user/login' }), userController.renderDashboard);

router.get('/logout', _helpers.ensureAuthenticated, userController.logoutUser);

router.get('/', _helpers.ensureAuthenticated, userController.renderDashboard);
router.get('/profile/:id', userController.renderProfile);

router.get('/edit/:id', _helpers.ensureAuthenticated, userController.renderEdit);
// Do I need these if there are API routes for the same thing?
router.put('/edit/:id', _helpers.ensureAuthenticated, userController.updateUserById);
router.delete('/delete/:id', _helpers.ensureAuthenticated, userController.deleteUserById);

module.exports = router;
//# sourceMappingURL=user.js.map