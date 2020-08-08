//** https://nodejs.org/api/http.html#http_http_methods **//

const express = require('express')
const app = express()
const router = express.Router()
var loadedControllers = []
var controllers = {}

function httpGet(uri, target, extra = { middlewares: [], request: undefined}){
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };  
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)
  route('get', uri, target, extra)
}
function httpPost(uri, target, extra = { middlewares: [], request: undefined}){
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };  
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)
  
  route('post', `/${callerfile}${uri}`, target, extra)
}
function httpPut(uri, target, extra = { middlewares: [], request: undefined}){
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };  
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)
  route('put', uri, target, extra)
}
function httpDelete(uri, target, extra = { middlewares: [], request: undefined}){
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };  
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)
  route('delete', uri, target, extra)
}

function route(httpMethod = 'get', uri, target, extra){    
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

    if(extra.request != undefined){
      console.log('not defined')
    }
    
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
  next();
}

module.exports = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
  router
}