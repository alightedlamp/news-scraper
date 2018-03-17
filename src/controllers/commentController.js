import Promise from 'promise-polyfill'

import Comment from '../models/Comment'

export const getCommentById = (req, res, next) =>
  Comment.find({ _id: req.params.id }, (err, doc) => {
    if (err) {
      next(err)
    } else {
      res.send(200).json(doc)
    }
  })

export const getAllComments = (req, res, next) =>
  Comment.find({ article_id: req.params.articleId }, (err, docs) => {
    if (err) {
      next(err)
    } else {
      res.send(200).json(docs)
    }
  })

export const postNewComment = (req, res, next) =>
  Comment.create(req.body, (err, doc) => {
    if (err) {
      next(err)
    } else {
      res.send(200).json(doc)
    }
  })

export const editComment = (req, res, next) =>
  Comment.update(req.body, (err, doc) => {
    if (err) {
      next(err)
    } else {
      res.send(200).json(doc)
    }
  })
export const deleteComment = (req, res, next) =>
  Comment.delete({ _id: req.params.id }, (err) => {
    if (err) {
      next(err)
    } else {
      res.send(200)
    }
  })
