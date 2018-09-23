const {
  apiDataValidator,
  apiDataValidatorConfig,
} = require('../../../helpers/apiDataValidator');

const {
  validatorString,
  validatorNumber,
} = require('../../../helpers/helpers');

const {
  safeHandler,
  localStrategy,
} = require('../../../helpers/middlewares');

module.exports.login = {
  method: 'post',
  path: '/auth/login',
  middlewares: [
    apiDataValidator({
      email: apiDataValidatorConfig(validatorString),
      password: apiDataValidatorConfig(validatorString),
    }),
    localStrategy,
  ],
  handler: ({
    UserService,
  }) => safeHandler(async (req, res, next) => {
    const user = req.user;
    const rememberMe = req.body.rememberMe || false;

    const token = UserService.login(
      user,
      rememberMe
    );

    if (!token) {
      throw new Error('Something went wrong!');
    }

    return res.status(200).json({
      token,
    });
  }),
};

module.exports.register = {
  method: 'post',
  path: '/auth/register',
  middlewares: [
    apiDataValidator({
      email: apiDataValidatorConfig(validatorString),
      password: apiDataValidatorConfig(validatorNumber),
      RoleId: apiDataValidatorConfig(validatorNumber),
    }),
  ],
  handler: ({
    UserService,
  }) => safeHandler(async (req, res, next) => {
    const userData = req.body;

    const theUser = await UserService.register(
      userData
    ).catch((error) => {
      throw new Error(error.message);
    });

    return res.status(200).json(theUser);
  }),
};
