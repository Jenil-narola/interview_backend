const Router = require('express').Router();
const { UserAuthorizationMiddleware } = require('../middleware');

Router.use('/', require('../controllers/products/products.routes'))

module.exports = Router;