/* globals __dirname __filename */

const fs = require('fs');
const path = require('path');

/** dynamically load all api routes */
const routers = fs.readdirSync(__dirname)
    .filter((filename) => filename !== path.basename(__filename))
    .filter((filename) => filename !== 'index.js')
    // relative to absolute path
    .map((filename) => path.join(__dirname, filename));

module.exports = (app) => routers.forEach(
    (router) => app.use('/api', require(router)));
