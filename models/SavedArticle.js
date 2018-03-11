const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedArticle = new Schema({
  user_id: {
    type: String,
    trim: true
  },
  article_id: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('SavedArticle', savedArticle);
