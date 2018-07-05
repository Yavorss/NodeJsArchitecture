const {
  middlewares,
} = require('../../../helpers');

const {
  isAdminMiddleware,
} = require('../../../helpers/middlewares');

module.exports.getAll = {
  method: 'get',
  path: '/users',
  middlewares: [isAdminMiddleware],
  handler: ({
    UserService,
  }) => middlewares.safeHandler(async (req, res, next) => {
    const users = await UserService.getUsers();
    res.status(200).json(users);
  }),
};

module.exports.getById = {
  method: 'get',
  path: '/users/:id',
  middlewares: [],
  handler: ({
    UserService,
  }) => middlewares.safeHandler(async (req, res, next) => {
    res.status(200).json([]);
  }),
};
