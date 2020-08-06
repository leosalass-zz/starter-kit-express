const Route = require('../app/middlewares/RouteMiddleware');


Route.get('/users', 'users/UserController.get', {middlewares:['logger']});
Route.post('/users', 'users/UserController.store');
Route.put('/users/list', 'users/UserController.get');
Route.delete('/users/list', 'users/UserController.get');