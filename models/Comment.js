const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
  user_id: {
    type: Number,
    trim: true
  },
  article_id: {
    type: Number,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Comment', comment);
