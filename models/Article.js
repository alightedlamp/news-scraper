const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const article = new Schema({
  title: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    trim: true
  },
  summary: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  num_favorites: {
    type: Number,
    trim: true
  },
  created_at: {
    type: Date
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

module.exports = mongoose.model('Article', article);
