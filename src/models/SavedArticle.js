const mongoose = require('mongoose')

const { Schema } = mongoose

const savedArticle = new Schema({
  user_id: {
    type: String,
    trim: true,
    required: true,
  },
  article_id: {
    type: String,
    trim: true,
    required: true,
  },
})

module.exports = mongoose.model('SavedArticle', savedArticle)
