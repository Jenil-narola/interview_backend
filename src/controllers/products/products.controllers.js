const { getLoggerInstance } = require('../../utils');
const { responseHelper } = require('../../helpers');
const { getProductById, getProductViewCount } = require('./products.functions');

module.exports.getProductByIdController = async function (req, res) {
    const logger = getLoggerInstance(...arguments)
    logger.info('Controllers > Products > Products > Products Controllers > getProductByIdController')

    const { productId, currency } = req.query;

    getProductById({ productId, currency })
        .then(result => responseHelper(res, result.status, result.message, result.data, result.customCode, result.metadata))
        .catch(error => responseHelper(res, error.status, error.message || 'Something went wrong', error.data, error.customCode, error.metadata))

};

module.exports.getProductViewCountByIdController = async function (req, res) {
    const logger = getLoggerInstance(...arguments)
    logger.info('Controllers > Products > Products > Products Controllers > getProductViewCountByIdController')

    const { limit, currency } = req.query;

    getProductViewCount({ limit, currency })
        .then(result => responseHelper(res, result.status, result.message, result.data, result.customCode, result.metadata))
        .catch(error => responseHelper(res, error.status, error.message || 'Something went wrong', error.data, error.customCode, error.metadata))

};
