const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define collection and schema for User
const User = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, {
    collection: 'users'
  });

// const user = mongoose.Schema({
//    _id: mongoose.Schema.Types.ObjectId,
//    email: {type: String, required: true},
//    password: {type: String, required: true}
// });

module.exports = mongoose.model('User', User);