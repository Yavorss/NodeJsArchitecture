/* globals __dirname, Set*/
const passport = require('passport');

const {
  generateFilenameHash,
} = require('./helpers');

const localStrategy = (req, res, next) => {
  return passport.authenticate('local', {
    session: false,
  }, (err, user, authError) => {
    if (authError) {
      return res.status(406).json({
        message: authError.message,
      });
    }

    // Attach the user to request
    req.user = user;

    return next();
  })(req, res, next);
};

const authMiddleware = (req, res, next) => {
  passport.authenticate('jwt', {
    session: false,
  }, (err, user, authError) => {
    if (!user) {
      return res.status(401).json({
        err: 'Unauthorized',
      });
    }

    req.user = user;

    return next();
  })(req, res, next);

  return null;
};

const isAdminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      err: 'Unauthorized',
    });
  }

  if (req.user.Role.title !== 'Administrator') {
    return res.status(401).json({
      err: 'Unauthorized',
    });
  }

  return next();
};

const safeHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  safeHandler,
  localStrategy,
  isAdminMiddleware,
  authMiddleware,
};
