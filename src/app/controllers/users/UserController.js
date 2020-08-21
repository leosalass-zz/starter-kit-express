const User = require(`${__Models}/User`);
var controller = {};

controller.get = function(req, res){
  console.log(req.session)
  res.send('get controller')
  return

  data = {username: 'Leonardo Fabio Salas Sarmiento'}
  rules = {username: 'available:User.name'}
  let validator = new Validator(data, rules);
  
  function passes() {
    // Validation passed
  }
  
  function fails() {
    console.log(validator.errors);
  }
  
  validator.checkAsync(passes, fails);
  res.send('getting the users')
};

controller.store = function(req, res){  
  User.store(req)
  res.send('store')
}

controller.update = function(req, res){
  //User.store(data)
  res.send('update')
}

controller.destroy = function(req, res){
  //User.store(data)
  res.send('destroy')
}

module.exports = controller