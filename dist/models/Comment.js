'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var comment = new Schema({
  user_id: {
    type: Number,
    trim: true,
    required: true
  },
  article_id: {
    type: Number,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Comment', comment);
//# sourceMappingURL=Comment.js.map