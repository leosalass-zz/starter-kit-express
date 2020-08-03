const User = require(`${__Models}/User`);
var controller = {};

controller.get = (function(req, res){
  User.get(req)
  res.send('Listando los usuarios..')
});

module.exports = controller