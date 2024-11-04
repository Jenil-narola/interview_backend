const Router = require('express').Router();
const Controllers = require('./products.controllers')

Router.get('/get', Controllers.getProductByIdController);
Router.get('/get-view-count', Controllers.getProductViewCountByIdController);

module.exports = Router;