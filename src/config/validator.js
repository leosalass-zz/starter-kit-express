/// FOR MORE INFORMATION: https://github.com/skaterdav85/validatorjs

const mongoose = require('mongoose');
//TODO: make this custom rule to work with mongoose
Validator.registerAsync('available', function(value, attribute, req, passes) {
  console.log('------------------------')

  attribute = attribute.split('.')
  const modelName = attribute[0]
  const field = attribute[1]
  
  var Model = mongoose.model(modelName);
  
  Model.findOne({[field]: value }, function (err, docs) {
    if(docs != null){
      passes(false, `${field}-available-validation-error`); 
    }
    passes();
  });
   
});

Validator.registerAsync('exists', function(value, attribute, req, passes) {
  console.log('------------------------')

  attribute = attribute.split('.')
  const modelName = attribute[0]
  const field = attribute[1]
  
  var Model = mongoose.model(modelName);
  
  Model.findOne({[field]: value }, function (err, docs) {
    if(docs == null){
      passes(false, `${field}-exists-validation-error`); 
    }
    passes();
  });
   
});