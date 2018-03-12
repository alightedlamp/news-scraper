const Article = require('../models/article');
const SavedArticle = require('../models/SavedArticle');
const scraper = require('../util/scrape');

// Article handlers
//////////////////////////////

// Scrape websites and update database with new articles
const populate = () => {
  return Promise.all([
    scraper.scrapeHackerNews(),
    scraper.scrapeMedium(),
    scraper.scrapeReddit()
  ]).then(data => {
    const results = {
      hackerNewsArticles: data[0],
      mediumArticles: data[1],
      redditArticles: data[2]
    };
  });
};

const getOne = id => {
  return new Promise((resolve, reject) => {
    Article.findOne({ _id: id }, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    Article.find({}, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
};

const getSaved = user_id => {
  return new Promise((resolve, reject) => {
    SavedArticles.find({ user_id }, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
};

// API route controllers
//////////////////////////////

const getAllArticles = (req, res) => getAll().then(data => res.json(data));
const getArticleById = (req, res) => getOne(id).then(data => res.json(data));

// HTML route controllers
//////////////////////////////

const renderHome = (req, res) => {
  Promise.all([populate(), getAll()])
    .then(data => {
      res.render('index', {
        articles: data
      });
    })
    .catch(err => res.status(500).send({ error: err }));
};

const renderSaved = (req, res) => {
  getSaved(req.user.id)
    .then(data => res.render('saved', { articles: data }))
    .catch(err => res.status(500).send({ error: err }));
};

const renderOne = (req, res) =>
  getOne(req.params.id).then(data => res.render('article', { article: data }));

module.exports = {
  renderHome: renderHome,
  renderOne: renderOne,
  renderSaved: renderSaved
};
