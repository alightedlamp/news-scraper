'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _articleController = require('../../controllers/articleController');

var articleController = _interopRequireWildcard(_articleController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/all', articleController.getAllArticles);
router.get('/scrape', articleController.populate);
router.get('/:id', articleController.getArticleById);

module.exports = router;
//# sourceMappingURL=article.js.map