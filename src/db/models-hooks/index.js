/* globals __dirname __filename */
const fs = require('fs');
const path = require('path');

const {
  helpers,
} = require('../../helpers');

const init = (data) => {
  const hooks = {};
  const config = {};

  /** dynamically load all model hooks */
  fs
    .readdirSync(__dirname)
    .filter((filename) => filename.includes('hooks'))
    .forEach((filename) => {
      const fileBaseName = helpers.capitalizeFirstLetter(
        path.basename(filename, '.hooks.js') + 'Hooks');
      hooks[fileBaseName] = require(
        path.join(__dirname, filename)
      )(data, config);
    });

    return hooks;
};

module.exports = init;
