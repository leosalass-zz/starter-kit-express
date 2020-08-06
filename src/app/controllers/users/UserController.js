const User = require(`${__Models}/User`);
var controller = {};

controller.get = function(req, res){
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
  const data = req.body
  const rules = {
    name: 'required'
  };

  const validation = new Validator(data, rules);

  if(validation.fails()){
    res.json(validation.errors)
    return
  }

  User.store(data)
  res.send('ok')
}

module.exports = controller