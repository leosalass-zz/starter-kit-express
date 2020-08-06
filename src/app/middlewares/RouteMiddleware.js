//** https://nodejs.org/api/http.html#http_http_methods **//

const express = require('express')
const app = express()
const router = express.Router()
var loadedControllers = []
var controllers = {}

function httpGet(uri, target, extra = { middlewares: []}){
  route('get', uri, target, extra)
}
function httpPost(uri, target, extra = { middlewares: []}){
  route('post', uri, target, extra)
}
function httpPut(uri, target, extra = { middlewares: []}){
  route('put', uri, target, extra)
}
function httpDelete(uri, target, extra = { middlewares: []}){
  route('delete', uri, target, extra)
}

function route(httpMethod = 'get', uri, target, extra = { middlewares: []}){    
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
      router[httpMethod](uri, controller[method]);
    }catch(err){}
}

function logger(req, res, next){
  console.log('logger')
  console.log(req.method)
  next();
}

module.exports = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
  router
}