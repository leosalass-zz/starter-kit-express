const express = require('express');
const path = require('path')
const dotenv = require('dotenv').config();
const session = require('express-session');
const validator = require('validatorjs')

//Initializations
const app = express();
require('./config/database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('App', path.join(__dirname, 'app'));

//Global Middlewares
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(function (req, res, next) {
  //console.log('Time:', Date.now());
  next();
});

//Global Variables
global.__basedir = __dirname;
global.__Config = path.join(__basedir, 'config')
global.__Routes = path.join(__basedir, 'routes')
global.__App = path.join(__basedir, 'app')
global.__Models = path.join(__App, 'models')
global.__Controllers = path.join(__App, 'controllers')
global.__Request = path.join(__App, 'request')
global.__Middlewares = path.join(__App, 'middlewares')
global.__RouteMiddleware = path.join(__Middlewares, 'RouteMiddleware')
global.Validator = validator

//Validator Config
require(`${__Config}/validator.js`);

//Routes
const routesFolder = __Routes;
const fs = require('fs');
fs.readdir(routesFolder, (err, files) => {
  files.forEach(file => {
    require(`${__Routes}\\${file}`);
  });
});

const { router } = require('./app/middlewares/RouteMiddleware.js')
app.use(router);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening
app.listen(app.get('port'), process.env.SERVER_ADDRESS, () => {
  console.log(`Server running on http://${process.env.SERVER_ADDRESS}:${app.get('port')}`);
});