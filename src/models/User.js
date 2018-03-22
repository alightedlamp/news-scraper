const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const { Schema } = mongoose

const user = new Schema({
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
  saved_articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

user.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', user)
