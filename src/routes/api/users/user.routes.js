const {
  apiDataValidator,
  apiDataValidatorConfig,
} = require('../../../helpers/apiDataValidator');

const {
  validatorNumber,
} = require('../../../helpers/helpers');

const {
  authMiddleware,
  isAdminMiddleware,
  safeHandler,
} = require('../../../helpers/middlewares');

module.exports.getAll = {
  method: 'get',
  path: '/users/getAllUsers',
  middlewares: [
    authMiddleware,
    isAdminMiddleware,
  ],
  handler: ({
    UserService,
  }) => safeHandler(async (req, res, next) => {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  }),
};

module.exports.getById = {
  method: 'get',
  path: '/users/getUserById',
  middlewares: [
    authMiddleware,
    isAdminMiddleware,
    apiDataValidator({
      id: apiDataValidatorConfig(validatorNumber),
    }),
  ],
  handler: ({
    UserService,
  }) => safeHandler(async (req, res, next) => {
    const userId = req.query.id;
    const theUser = UserService.getUserById(userId);

    res.status(200).json(theUser);
  }),
};
