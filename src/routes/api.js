const Route = require(__RouteMiddleware);

Route.get('/users', 'users/UserController.get');
Route.post('/users', 'users/UserController.store', {middlewares:['logger'], request: 'UserStoreRequest'});
Route.put('/users', 'users/UserController.update');
Route.delete('/users', 'users/UserController.destroy');