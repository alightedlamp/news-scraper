'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var savedArticle = new Schema({
  user_id: {
    type: String,
    trim: true,
    required: true
  },
  article_id: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model('SavedArticle', savedArticle);
//# sourceMappingURL=SavedArticle.js.map