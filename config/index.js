/* globals process */
/* eslint-disable no-process-env */
const env = process.env.NODE_ENV || 'development';

module.exports = require('./config.json')[env];
