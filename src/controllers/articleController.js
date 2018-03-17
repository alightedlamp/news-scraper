import Promise from 'promise-polyfill'

import Article from '../models/Article'
import SavedArticle from '../models/SavedArticle'
import scraper from '../util/scraper'

// Article handlers
// ////////////////////////////

export const populate = () =>
  // eslint-disable-next-line
  Promise.all([scraper.scrapeHackerNews(), scraper.scrapeReddit()])
    .then((data) => {
      const articles = data.reduce((reducer, arr) => reducer.concat(arr), [])
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        Article.create(articles, (err, docs) => {
          if (err) {
            reject(err)
          } else {
            resolve(docs)
          }
        })
      })
    })
    .catch(err => new Error(err))

export const getOne = id =>
  // eslint-disable-next-line
  new Promise((resolve, reject) => {
    Article.findOne({ _id: id }, (err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    }).catch(err => new Error(err))
  })

export const getAll = () =>
  // eslint-disable-next-line
  new Promise((resolve, reject) => {
    Article.find({}, (err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    }).catch(err => new Error(err))
  })

export const getSaved = userId =>
  // eslint-disable-next-line
  new Promise((resolve, reject) => {
    SavedArticle.find({ userId }, (err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    }).catch(err => new Error(err))
  })

// API route controllers
// ////////////////////////////

export const getAllArticles = (req, res) => getAll().then(data => res.json(data))
export const getArticleById = (req, res) => getOne(req.params.id).then(data => res.json(data))

// HTML route controllers
// ////////////////////////////

export const renderHome = async (req, res) => {
  try {
    // This will be triggered on front-end to avoid blocking page load
    const newArticles = await populate()
    const savedArticles = await getAll()

    const articles = savedArticles.concat(newArticles)
    res.render('index', {
      articles,
    })
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

export const renderSaved = (req, res) =>
  getSaved(req.user.id)
    .then(data => res.render('saved', { articles: data }))
    .catch(err => res.status(500).send({ error: err }))

export const renderOne = (req, res) =>
  getOne(req.params.id).then(data => res.render('article', { article: data }))

export const renderAll = (req, res) => getAll().then(data => res.render('all', { articles: data }))
