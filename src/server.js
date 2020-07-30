const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000)
app.set('App', path.join(__dirname, 'app'))

//Middlewares
app.use(express.urlencoded({extended: false}))

//Global Variables

//Routes

//Static Files

//Server is listening
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')} ${process.env.NODE_ENV}`);
})