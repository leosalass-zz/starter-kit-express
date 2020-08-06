///const { Mongoose } = require("mongoose")

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/starter-kit', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
.then(db => console.log('Connected to mongodb'))
.catch(err => console.error(err));