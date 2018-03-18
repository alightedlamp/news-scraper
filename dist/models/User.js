'use strict';

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;


var user = new Schema({
  first_name: {
    type: String,
    trim: true
  },
  last_name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  },
  saved_articles: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

user.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', user);
//# sourceMappingURL=User.js.map