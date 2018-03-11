const Article = require('../models/article');
const errorHandler = require('../util/errorHandler');

const getOne = () => {
  return new Promise((resolve, reject) => {
    Article.findOne({}, (err, docs) => {
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

const getSaved = () => {
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

const renderHome = (req, res) => {
  // const articles = getAll()
  //   .then(data => {
  //     res.render('index', {
  //       data: data
  //     });
  //   })
  //   .catch(err => handleError(res, err, 500));
  res.render('index');
};

const renderSaved = (req, res) => {
  const articles = getSaved()
    .then(data => {
      res.render('saved', {
        data: data
      });
    })
    .catch(err => handleError(res, err, 500));
};

const renderOne = (req, res) => {
  res.send('Not implemented');
};

module.exports = {
  renderHome: renderHome,
  renderSaved: renderSaved
};
