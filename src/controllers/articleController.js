// @flow
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
      return Article.create(articles)
    })
    .catch(err => new Error(err))

export const getAll = () => Article.find({})
export const getOne = (id: string) => Article.findOne({ _id: id })
export const getSaved = (userId: string) => SavedArticle.find({ userId })

// API route controllers
// ////////////////////////////

export const getAllArticles = (req, res) => getAll().then(data => res.json(data))
export const getArticleById = (req, res) => getOne(req.params.id).then(data => res.json(data))

// HTML route controllers
// ////////////////////////////

export const renderHome = async (req, res, next) => {
  const { user } = req || ''
  try {
    const newArticles = await populate()
    const savedArticles = await getAll()

    const articles = savedArticles.concat(newArticles)
    res.render('index', {
      articles,
      user,
    })
  } catch (err) {
    next(err)
  }
}

export const renderSaved = (req, res, next) =>
  getSaved(req.user.id)
    .then(data => res.render('saved', { articles: data }))
    .catch(err => next(err))

export const renderOne = (req, res) =>
  getOne(req.params.id).then(data => res.render('article', { article: data }))

export const renderAll = (req, res) => getAll().then(data => res.render('all', { articles: data }))
