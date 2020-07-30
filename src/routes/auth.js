const express = require('express')
const router = express.Router()

router.get('/users/signin/', (req, res) => {
  res.send('ingresando..')
});

router.get('/users/signup/', (req, res) => {
  res.send('Formulario de registro')
});

module.exports = router