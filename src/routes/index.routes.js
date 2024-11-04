// Import Controller and Allocate Route
const Router = require('express').Router();

Router.use('/products', require('./products.routes'))

module.exports = Router;