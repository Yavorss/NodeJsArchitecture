const express = require('express');
const {
    Router,
} = express;
const userRoutes = require('./user.routes');

const {
    middlewares,
} = require('../../../helpers');

const {
    UserService,
} = require('../../../services');


const router = new Router();


Object.values(userRoutes).forEach((route) => {
    router[route.method](
        route.path, [middlewares.isAdminMiddleware],
        route.handler({
            UserService,
        }));
});


module.exports = router;
