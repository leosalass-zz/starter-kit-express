const express = require('express')
const app = express()
const router = express.Router()
var loadedControllers = []
var controllers = {}


function get(uri, target, extra = { middlewares: []}){    
    try{
      for(let midIndex = 0; midIndex < extra.middlewares.length; midIndex++){
        const midName = extra.middlewares[midIndex]
        switch(midName){
          case 'logger':
            router.use(uri, logger)
            break;
        }
      }
    }catch(err){}
    
    const data = target.split('.');
    const pathToController = `../controllers/${data[0]}`;
    const method = data[1];

    var controller;

    if(!loadedControllers.includes(pathToController)){
      loadedControllers.push(pathToController);
      controller = require(`${__Controllers}/${pathToController}`);
      controllers[pathToController] = controller;
    }else{
      controller = controllers[pathToController];
    }

    try{
      router.get(uri, controller[method]);
    }catch(err){}
}

function logger(req, res, next){
  console.log('logger')
  console.log(req.method)
  next();
}

module.exports = {
  get: get,
  router
}