'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../shared/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const FREECODECAMP_URL = 'https://medium.freecodecamp.org/'
// const CSS_TRICKS_URL = 'https://css-tricks.com'
// const SMASHING_MAG_URL = 'https://www.smashingmagazine.com/articles/'
// const CODING_HORROR_URL = 'https://blog.codinghorror.com/'

var scrapeMedium = function scrapeMedium() {
  return _axios2.default.get(_config.HACKERNOON_URL).then(function (response) {
    var $ = _cheerio2.default.load(response.data);

    var data = [];
    var parent = $('.postArticle');

    parent.each(function (i, el) {
      console.log(el.child('a').attr('href'));
      console.log(el.find('.graf'));
      data.push({
        title: 'test',
        link: 'test',
        score: 10,
        source: 'Hackernoon'
      });
    });
    return data;
  }).catch(function (err) {
    return new Error(err);
  });
};

var scrapeReddit = function scrapeReddit() {
  return _axios2.default.get(_config.REDDIT_URL).then(function (response) {
    var $ = _cheerio2.default.load(response.data);

    var data = [];

    $('div.link').each(function (i, el) {
      var item = $(el).find($('a.title'));
      data.push({
        title: item.text(),
        link: item.attr('href'),
        score: $(el).attr('data-score'),
        source: 'JavaScript Subreddit'
      });
    });
    return data;
  }).catch(function (err) {
    return new Error(err);
  });
};

var scrapeHackerNews = function scrapeHackerNews() {
  return _axios2.default.get(_config.HACKERNEWS_URL).then(function (response) {
    var $ = _cheerio2.default.load(response.data);

    var data = [];
    var parent = $('.athing');

    parent.each(function (i, el) {
      var item = $(el).find($('.title a'));

      data.push({
        title: item.text(),
        link: item.attr('href'),
        score: $(el).parent('.athing').next().children('.score').text().split(' ')[0],
        source: 'HackerNews'
      });
    });
    return data;
  }).catch(function (err) {
    return new Error(err);
  });
};

exports.default = {
  scrapeMedium: scrapeMedium,
  scrapeReddit: scrapeReddit,
  scrapeHackerNews: scrapeHackerNews
};
//# sourceMappingURL=scraper.js.map