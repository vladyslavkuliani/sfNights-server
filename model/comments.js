var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = Schema({
  content: String,
  userName: String,
  userProfilePic: String,
  rating: Number,
  time: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
