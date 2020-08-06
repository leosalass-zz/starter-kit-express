const User = require(`${__Models}/User`);
var controller = {};

controller.get = function(req, res){
  //let validation = new Validator
  const data = req.body
  const rules = {
    name: 'required',
    email: 'required|email',
    age: 'min:18'
  };
  const validation = new Validator(data, rules);

  console.log(validation.passes())
  console.log(validation.errors)
  User.get(req)
  res.send('Listando los usuarios..')
};

module.exports = controller