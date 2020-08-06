const Route = require('../app/middlewares/RouteMiddleware');


Route.get('/users/list', 'users/UserController.get', {middlewares:['logger']});
Route.post('/users/list', 'users/UserController.get');
Route.put('/users/list', 'users/UserController.get');
Route.delete('/users/list', 'users/UserController.get');