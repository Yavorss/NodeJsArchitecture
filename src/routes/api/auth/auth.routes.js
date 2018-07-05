const passport = require('passport');
const {
  isAdminMiddleware,
} = require('../../../helpers/middlewares');

const {
  middlewares,
} = require('../../../helpers');

module.exports.login = {
  method: 'post',
  path: '/auth/login',
  middlewares: [passport.authenticate('local', {
    session: false,
  })],
  handler: ({
    UserService,
  }) => middlewares.safeHandler(async (req, res, next) => {
    const user = req.user;
    const rememberMe = req.body.rememberMe;

    if (user.error) {
      return res.status(401).json({
        err: user.error,
      });
    }

    let token = null;

    if (user) {
      token = UserService.login(user, rememberMe);
    }

    if (!token) {
      return res.status(401)
        .json({
          err: 'Something went wrong!',
        });
    }

    return res.status(200).json({
      token,
    });
  }),
};

module.exports.register = {
  method: 'post',
  path: '/auth/register',
  middlewares: [isAdminMiddleware],
  handler: ({ UserService,
  }) => middlewares.safeHandler(async (req, res, next) => {
    const {
      name,
      email,
      password,
      role,
      phone,
    } = req.body;

    if (!name || name.length < 3) {
      return res.status(422).json({
        err: 'Please, enter valid names!',
      });
    }

    if (!phone || phone.length < 3) {
      return res.status(422).json({
        err: 'Please, enter valid phone!',
      });
    }

    /* Build email validator */
    if (!email) {
      return res.status(422)
        .json({
          err: 'You must enter an email address',
        });
    }

    if (!password || passport.length <= 4) {
      return res.status(422)
        .json({
          err: 'The pin code must be more the 4 numbers!',
        });
    }

    if (role !== 'Waiter' && role !== 'Bartender') {
      return res.status(422)
        .json({
          err: 'Something went wrong!',
        });
    }

    const user = await UserService.register({
      name,
      email,
      password,
      role,
      phone,
    });

    if (typeof user.err !== 'undefined') {
      return res.status(422)
        .json({
          err: user.err,
        });
    }

    return res.status(201).json({
      msg: 'The registration was successful',
    });
  }),
};
