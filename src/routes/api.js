const Route = require('../app/middlewares/RouteMiddleware');

Route.get('/users/get', 'users/UserController.get', {middlewares:['logger']});