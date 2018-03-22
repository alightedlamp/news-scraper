import Comment from '../models/Comment'
import User from '../models/User'

export const getCommentById = (req, res, next) =>
  Comment.find({ _id: req.params.id })
    .then(doc => res.sendStatus(200).json(doc))
    .catch(err => next(err))

export const getAllComments = (req, res, next) =>
  Comment.find({ article_id: req.params.articleId })
    .then(docs => res.sendStatus(200).json(docs))
    .catch(err => next(err))

export const postNewComment = (req, res, next) =>
  Comment.create(req.body)
    .then(doc => User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { comments: doc._id } },
      { new: true },
    ))
    .then(user => res.sendStatus(200).json(user))
    .catch(err => next(err))

export const editComment = (req, res, next) =>
  Comment.update(req.body)
    .then(doc => res.sendStatus(200).json(doc))
    .catch(err => next(err))

export const deleteComment = (req, res, next) =>
  Comment.delete({ _id: req.params.id })
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
