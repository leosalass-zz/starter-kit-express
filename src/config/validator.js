/// FOR MORE INFORMATION: https://github.com/skaterdav85/validatorjs


//TODO: make this custom rule to work with mongoose
Validator.registerAsync('username_available', function(username, attribute, req, passes) {
  // do your database/api checks here etc
  // then call the `passes` method where appropriate:
  passes(); // if username is available
  passes(false, 'Username has already been taken.'); // if username is not available
});