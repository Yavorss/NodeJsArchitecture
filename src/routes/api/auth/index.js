const express = require('express');
const {
  Router,
} = express;

const userRoutes = require('./auth.routes');
const {
  UserService,
} = require('../../../services');

const router = new Router();

Object.values(userRoutes).forEach((route) => {
  router[route.method](
    route.path,
    ...route.middlewares,
    route.handler({
      UserService,
    }));
});

module.exports = router;
