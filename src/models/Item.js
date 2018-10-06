var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define collection and schema for Items
var Item = new Schema({
  item: {
    type: String
  },
  isPurchased: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
}, {
  collection: 'items'
});

module.exports = mongoose.model('Item', Item);
