const models = require('../db/models');
const genericData = require('./generic.data');
const data = require('./data')(models, genericData);

const hooks = require('../db/models-hooks')(data);
const setTheHooks = require('./hooks');
setTheHooks(models, hooks);

module.exports = data;
