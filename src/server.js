const express = require('express');
const path = require('path')
const dotenv = require('dotenv').config();
const session = require('express-session');


//Initializations
const app = express();
require('./config/database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('App', path.join(__dirname, 'app'));

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
//Global Variables

//Routes
app.use(require('./routes/api.js'));
app.use(require('./routes/user.js'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Server is listening
app.listen(app.get('port'), process.env.SERVER_ADDRESS, () => {
  console.log(`Server running on http://${process.env.SERVER_ADDRESS}:${app.get('port')}`);
});