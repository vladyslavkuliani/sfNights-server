var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserPlaceSchema = Schema({
  date: Date,
  placeId: {
    type: Schema.Types.ObjectId,
    ref: 'Place'
  },

  visitorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var UserPlace = mongoose.model('UserPlace', UserPlaceSchema);
module.exports = UserPlace;