/// FOR MORE INFORMATION: https://github.com/skaterdav85/validatorjs

const mongoose = require('mongoose');
//TODO: make this custom rule to work with mongoose
Validator.registerAsync('available', function(value, attribute, req, passes) {
  console.log('------------------------')

  attribute = attribute.split('.')
  const modelName = attribute[0]
  const field = attribute[1]
  
  var Model = mongoose.model(modelName);
  
  Model.find({[field]: value }, function (err, docs) {    
    console.log(docs.length)
    if(docs.length > 0){
      passes(false, `${field} has already been taken.`); 
    }
    passes();
  });
   
});