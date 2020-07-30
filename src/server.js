const express = require('express');
const path = require('path')
const dotenv = require('dotenv').config();
const session = require('express-session');


//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000)
app.set('App', path.join(__dirname, 'app'))

//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))
//Global Variables

//Routes

//Static Files

//Server is listening
app.listen(app.get('port'), () => {
  console.log(`Server listening on port:${app.get('port')} Mode:${process.env.NODE_ENV}`);
})