const cheerio = require('cheerio');
const axios = require('axios');

const MEDIUM_URL = 'https://medium.com/@hackernoon';
const REDDIT_URL = 'https://www.reddit.com/r/javascript/';
const HACKERNEWS_URL = 'https://news.ycombinator.com/';

const scrapeMedium = function() {
  return axios.get(MEDIUM_URL).then(html => {
    const $ = cheerio.load(html);
  });
};

const scrapeReddit = function() {
  return axios.get(REDDIT_URL).then(html => {
    const $ = cheerio.load(html);
  });
};

const scrapeHackerNews = function() {
  return axios.get(HACKERNEWS_URL).then(html => {
    const $ = cheerio.load(html);
  });
};

module.exports = {
  scrapeMedium: scrapeMedium,
  scrapeReddit: scrapeReddit,
  scrapeHackerNews: scrapeHackerNews
};
