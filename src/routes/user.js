const express = require('express')
const router = express.Router()
const User = require('../app/models/User');

router.get('/users/signin/', async (req, res) => {
  let user = new User({id: 1, name: 'leo salas'})
  await user.save();
  console.log(user)
  res.send('ingresando..')
});

router.get('/users/signup/', (req, res) => {
  res.send('Formulario de registro')
});

module.exports = router