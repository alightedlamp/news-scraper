'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteComment = exports.editComment = exports.postNewComment = exports.getAllComments = exports.getCommentById = undefined;

var _Comment = require('../models/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommentById = exports.getCommentById = function getCommentById(req, res, next) {
  return _Comment2.default.find({ _id: req.params.id }).then(function (doc) {
    return res.sendStatus(200).json(doc);
  }).catch(function (err) {
    return next(err);
  });
};

var getAllComments = exports.getAllComments = function getAllComments(req, res, next) {
  return _Comment2.default.find({ article_id: req.params.articleId }).then(function (docs) {
    return res.sendStatus(200).json(docs);
  }).catch(function (err) {
    return next(err);
  });
};

var postNewComment = exports.postNewComment = function postNewComment(req, res, next) {
  return _Comment2.default.create(req.body).then(function (doc) {
    return res.sendStatus(200).json(doc);
  }).catch(function (err) {
    return next(err);
  });
};

var editComment = exports.editComment = function editComment(req, res, next) {
  return _Comment2.default.update(req.body).then(function (doc) {
    return res.sendStatus(200).json(doc);
  }).catch(function (err) {
    return next(err);
  });
};

var deleteComment = exports.deleteComment = function deleteComment(req, res, next) {
  return _Comment2.default.delete({ _id: req.params.id }).then(function () {
    return res.sendStatus(200);
  }).catch(function (err) {
    return next(err);
  });
};
//# sourceMappingURL=commentController.js.map