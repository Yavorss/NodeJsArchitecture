const {
  User,
} = require('../db/models');

const data = require('./generic.data');

module.exports = {
  user: data(User, {}),
};
