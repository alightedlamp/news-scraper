'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAll = exports.renderOne = exports.renderSaved = exports.renderHome = exports.getArticleById = exports.getAllArticles = exports.getSaved = exports.getOne = exports.getAll = exports.populate = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promisePolyfill = require('promise-polyfill');

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

var _Article = require('../models/Article');

var _Article2 = _interopRequireDefault(_Article);

var _SavedArticle = require('../models/SavedArticle');

var _SavedArticle2 = _interopRequireDefault(_SavedArticle);

var _scraper = require('../util/scraper');

var _scraper2 = _interopRequireDefault(_scraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Article handlers
// ////////////////////////////

var populate = exports.populate = function populate() {
  return (
    // eslint-disable-next-line
    _promisePolyfill2.default.all([_scraper2.default.scrapeHackerNews(), _scraper2.default.scrapeReddit()]).then(function (data) {
      var articles = data.reduce(function (reducer, arr) {
        return reducer.concat(arr);
      }, []);
      return _Article2.default.create(articles);
    }).catch(function (err) {
      return new Error(err);
    })
  );
};

var getAll = exports.getAll = function getAll() {
  return _Article2.default.find({});
};
var getOne = exports.getOne = function getOne(id) {
  return _Article2.default.findOne({ _id: id });
};
var getSaved = exports.getSaved = function getSaved(userId) {
  return _SavedArticle2.default.find({ userId: userId });
};

// API route controllers
// ////////////////////////////

var getAllArticles = exports.getAllArticles = function getAllArticles(req, res) {
  return getAll().then(function (data) {
    return res.json(data);
  });
};
var getArticleById = exports.getArticleById = function getArticleById(req, res) {
  return getOne(req.params.id).then(function (data) {
    return res.json(data);
  });
};

// HTML route controllers
// ////////////////////////////

var renderHome = exports.renderHome = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var newArticles, savedArticles, articles;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return populate();

          case 3:
            newArticles = _context.sent;
            _context.next = 6;
            return getAll();

          case 6:
            savedArticles = _context.sent;
            articles = savedArticles.concat(newArticles);

            res.render('index', {
              articles: articles
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](0);

            next(_context.t0);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 11]]);
  }));

  return function renderHome(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var renderSaved = exports.renderSaved = function renderSaved(req, res, next) {
  return getSaved(req.user.id).then(function (data) {
    return res.render('saved', { articles: data });
  }).catch(function (err) {
    return next(err);
  });
};

var renderOne = exports.renderOne = function renderOne(req, res) {
  return getOne(req.params.id).then(function (data) {
    return res.render('article', { article: data });
  });
};

var renderAll = exports.renderAll = function renderAll(req, res) {
  return getAll().then(function (data) {
    return res.render('all', { articles: data });
  });
};
//# sourceMappingURL=articleController.js.map