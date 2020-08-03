const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = {}

const UserSchema = new Schema({
  name: { type: String, required: true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

User.store = function(req){
  console.log('storing the user')
}

User.get = function(req){
  console.log('users list in MODEL')
  console.log(req.method)
}

module.exports = User
//module.exports = mongoose.model('User', UserSchema)