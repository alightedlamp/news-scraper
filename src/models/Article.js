const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose

const article = new Schema({
  title: {
    type: String,
    trim: true,
    unqique: true,
    required: true,
  },
  author: {
    type: String,
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  score: {
    type: Number,
  },
  num_favorites: {
    type: Number,
    trim: true,
  },
  source: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
})

article.plugin(uniqueValidator)
module.exports = mongoose.model('Article', article)
