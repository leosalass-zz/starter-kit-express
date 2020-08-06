const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = {}

const UserSchema = new Schema({
  name: { type: String, required: true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

mongoose.model('User', UserSchema)
var Model = mongoose.model('User');

User.store = function(data){
  var instance = new Model();
  instance.name = data.name;
  instance.save(function (err) {
    console.log(err)
    return false;
  });
  return true;
}

User.get = function(req){
  Model.find({ 'name': 'Leonardo Fabio Salas Sarmiento' }, function (err, docs) {
    // docs is an array
    console.log(docs)
  });
  console.log('users list in MODEL')
}

module.exports = User
//module.exports = mongoose.model('User', UserSchema)