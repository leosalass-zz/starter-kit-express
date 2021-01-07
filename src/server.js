const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const passport = require('passport');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const validator = require('validatorjs');

//Initializations
const app = express();
require('./config/database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('App', path.join(__dirname, 'app'));

//Global Middlewares
app.use(express.urlencoded({extended: false}));
app.use(cookieParser('123-456-789'))
app.use(session({
  name: 'session-id',
  secret: '123-456-789',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done){    
    if(username === 'admin' && password === "123456"){
      return done(null, {id: 1, name: "Patry Rubio"})
    }
    done(null, false)
  }
));
passport.serializeUser(function(user, done){
  done(null, user.id)
});
passport.deserializeUser(function(id, done){
  done(null, {id: 1, name: "Patry Rubio"})
})

passport.use(new BearerStrategy(
  {
    token: 'usertoken'
  },
  function(token, done){    
    if(token === 'ASD123..'){
      return done(null, {id: 1, name: "Patry Rubio"})
    }
    done(null, false)
  }
  /*function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }*/
));

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

const { router } = require('./app/middlewares/RouteMiddleware.js');
const User = require('./app/models/User');
app.use(router);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening
app.listen(app.get('port'), process.env.SERVER_ADDRESS, () => {
  console.log(`Server running on http://${process.env.SERVER_ADDRESS}:${app.get('port')}`);
});