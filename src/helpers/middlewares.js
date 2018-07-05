/* globals __dirname, Set*/
const path = require('path');
const passport = require('passport');
const multer = require('multer');

const {
  generateFilenameHash,
} = require('./helpers');
const multerConfig = require('../../config').multer;

const isAdminMiddleware = (req, res, next) => {
  passport.authenticate('jwt', {
    session: false,
  }, (err, user, authError) => {
    if (user.Role.title !== 'Administrator') {
      return res.status(401).json({ err: 'Unauthorized' });
    }

    return next();
  })(req, res, next);

  return null;
};

const safeHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  safeHandler,
  isAdminMiddleware,
  uploadFileMiddleware,
};
