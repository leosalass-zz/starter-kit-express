const Route = require(__RouteMiddleware);

Route.get('', 'users/UserController.get');
Route.post('', 'users/UserController.store', {middlewares:[], request: 'UserStoreRequest', auth: true});
Route.put('', 'users/UserController.update');
Route.delete('', 'users/UserController.destroy');