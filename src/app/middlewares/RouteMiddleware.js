//** https://nodejs.org/api/http.html#http_http_methods **//

const express = require('express')
const { request } = require('express')
const app = express()
const router = express.Router()
var loadedControllers = []
var controllers = {}
var controllersMiddlewares = []
var requires = []

function httpGet(uri, target, extra = { middlewares: [], request: undefined }) {
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)
  route('get', `/${callerfile}${uri}`, target, extra)
}
function httpPost(uri, target, extra = { middlewares: [], request: undefined }) {
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)

  route('post', `/${callerfile}${uri}`, target, extra)
}
function httpPut(uri, target, extra = { middlewares: [], request: undefined }) {
  var err = new Error();
  Error.prepareStackTrace = function (err, stack) { return stack; };
  currentfile = err.stack.shift().getFileName();
  callerfile = err.stack.shift().getFileName();
  callerfile = /routes(.+)/.exec(callerfile)[1]
  callerfile = callerfile.replace('.js', '')
  callerfile = callerfile.substr(1)
  route('put', `/${callerfile}${uri}`, target, extra)
}
function httpDelete(uri, target, extra = { middlewares: [], request: undefined }) {
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
  try {
    if (extra.request != undefined) {
      const data = { method: httpMethod, baseUrl: uri, request: extra.request }
      const index = `${httpMethod}${uri}`
      controllersMiddlewares[index] = data
      requires[index] = require(`${__Request}\\${extra.request}.js`)
      console.log(uri)
      router.use(uri, setControllersMiddleware)
    }
  } catch (err) {
    console.log(err)
  }

  /*try {
    for (let midIndex = 0; midIndex < extra.middlewares.length; midIndex++) {
      const midName = extra.middlewares[midIndex]
      switch (midName) {
        case 'logger':
          router.use(uri, logger)
          break;
      }

    }
  } catch (err) { }*/

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

function setControllersMiddleware(req, res, next) {
  try {
    const index = `${req.method.toLowerCase()}${req.baseUrl}`
    if (controllersMiddlewares[index] != undefined) {
      const config = controllersMiddlewares[index]
      console.log(config)
      if (requires[index] != undefined) {
        requires[index](req, res, next)
      }
    }
  } catch (err) { }
  next();
}

module.exports = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
  router
}