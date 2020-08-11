//** https://nodejs.org/api/http.html#http_http_methods **//

const express = require('express')
const { request } = require('express');

const passport = require('passport');

const app = express();
const router = express.Router();
var loadedControllers = [];
var controllers = {};
var authenticatedRoutes = [];
var controllerRequests = [];
var requires = [];

function httpGet(uri, target, extra = { middlewares: [], request: undefined, auth: undefined }) {
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)
  route('get', `/${callerfile}${uri}`, target, extra)
}
function httpPost(uri, target, extra = { middlewares: [], request: undefined, auth: undefined }) {
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)

  route('post', `/${callerfile}${uri}`, target, extra)
}
function httpPut(uri, target, extra = { middlewares: [], request: undefined, auth: undefined }) {
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)
  route('put', `/${callerfile}${uri}`, target, extra)
}
function httpDelete(uri, target, extra = { middlewares: [], request: undefined, auth: undefined }) {
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)
  route('delete', `/${callerfile}${uri}`, target, extra)
}

function route(httpMethod = 'get', uri, target, extra) {
  
  uri = `/api/v1${uri}`
  const key = `${httpMethod}${uri}`;
  let hasMiddlewares = false;

  if(extra.auth != undefined && extra.auth){
    authenticatedRoutes[key] = true;
    router.use(uri, authenticate)
  }
  
  if (extra.request != undefined) {
    controllerRequests[key] = { method: httpMethod, baseUrl: uri, request: extra.request };
    requires[key] = require(`${__Request}\\${extra.request}.js`);
    hasMiddlewares = true;
  }
  
  if(hasMiddlewares) router.use(uri, setControllersMiddleware)

  const data = target.split('.');
  const pathToController = `../controllers/${data[0]}`;
  const method = data[1];

  var controller;

  if (!loadedControllers.includes(pathToController)) {
    loadedControllers.push(pathToController);
    controller = require(`${__Controllers}/${pathToController}`);
    controllers[pathToController] = controller;
  } else {
    controller = controllers[pathToController];
  }

  try {
    router[httpMethod](uri, controller[method]);
  } catch (err) { }
}

function authenticate(req, res, next) {
  const key = `${req.method.toLowerCase()}${req.baseUrl}`
  try {    
    if(authenticatedRoutes[key] != undefined && authenticatedRoutes[key]){
      //console.log('áuth is true')
      passport.authenticate('local')(req, res, next, () => {
        res.send('passport test')
        next()
      });      
    }
  } catch (err) {console.log(err)}
}

function setControllersMiddleware(req, res, next) {
  const key = `${req.method.toLowerCase()}${req.baseUrl}`  
  try {
    if (controllerRequests[key] != undefined) {
      //const config = controllerRequests[key]
      if (requires[key] != undefined) {
        requires[key](req, res, next)
      }
    }
  } catch (err) {}
  next();
}

module.exports = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
  router
}