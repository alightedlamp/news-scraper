const mongoose = require('mongoose')

const { Schema } = mongoose

const user = new Schema({
  username: {
    type: String,
    trim: true,
  },
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
  },
  password_hash: {
    type: String,
  },
  saved_articles: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('User', user)
