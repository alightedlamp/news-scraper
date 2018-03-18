'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _commentController = require('../../controllers/commentController');

var commentController = _interopRequireWildcard(_commentController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// API routes
// ////////////////////////////

router.get('/:id', commentController.getCommentById);
router.get('/all/:articleId', commentController.getAllComments);
router.post('/new', commentController.postNewComment);
router.put('/:id', commentController.editComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
//# sourceMappingURL=comment.js.map