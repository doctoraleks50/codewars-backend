const Bottle = require('bottlejs');
const TasksController = require('./controllers/v1/TasksController');
const TasksRepository = require('./services/repositories/TasksRepository');
const UsersController = require('./controllers/v1/UsersController');
const UsersRepository = require('./services/repositories/UsersRepository');
const SolutionsController = require('./controllers/v1/SolutionsController');
const SolutionsRepository = require('./services/repositories/SolutionsRepository');
const Database = require('./models/');
const di = new Bottle();
const CodeRunner = require('./services/CodeRunner');
const RandomTaskGenerator = require('./services/RandomTaskGenerator');
const UserService = require('./services/UserService');
const UserCalculator = require('./services/UserCalculator');


di.factory('Database', () => Database);
di.service('TasksRepository', TasksRepository, 'Database');
di.service('TasksController', TasksController, 'TasksRepository', 'RandomTaskGenerator');
di.service('UsersRepository', UsersRepository, 'Database');
di.service('UsersController', UsersController, 'UsersRepository', 'UserService');
di.service('SolutionsRepository', SolutionsRepository, 'Database');
di.service('CodeRunner', CodeRunner, 'Database');
di.service('SolutionsController', SolutionsController, 'SolutionsRepository', 'CodeRunner');
di.service('UserCalculator', UserCalculator);
di.service('UserService', UserService, 'Database', 'UserCalculator');
di.service('RandomTaskGenerator', RandomTaskGenerator, 'Database', 'UserCalculator');
module.exports = di.container;
