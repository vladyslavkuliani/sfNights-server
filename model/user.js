var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');

var UserSchema = Schema({
  name: String,
  email: String,
  dob: Date,
  currentCity: String,
  profilePicture: String,
  passwordDigest: String,
  visitedPlaces: [{
    type: Schema.Types.ObjectId,
    ref: 'UserPlace'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

UserSchema.statics.createSecure = function(name, email, dob, password, callback){
  var UserModel = this;

  bcrypt.genSalt(function(err,salt){
    bcrypt.hash(password, salt, function(err, hash){
      UserModel.create({
        name: name,
        email: email,
        dob: dob,
        passwordDigest: hash
      }, callback);
    });
  });
}

UserSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.passwordDigest);
}

UserSchema.statics.authenticate = function(email, password, callback){
    this.findOne({email:email}, function(err, user){
      if(!user){
        console.log("No user with email " + email);
        callback("Error, no user found", null);
      } else if(user.checkPassword(password)){
        callback(null, user);
      } else{
        callback("Error, incorrect password", null);
      }
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;