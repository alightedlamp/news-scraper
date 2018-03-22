const mongoose = require('mongoose')

const { Schema } = mongoose

const comment = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  article_id: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Comment', comment)
