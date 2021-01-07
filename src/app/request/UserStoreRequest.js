function validation(req, res, next){
  
  const data = req.body
  const rules = {
    name: 'required'
  }
  
  const validation = new Validator(data, rules);
  if(validation.fails()){
    res.json(validation.errors)
    return false
  }

  next()
}

module.exports = validation