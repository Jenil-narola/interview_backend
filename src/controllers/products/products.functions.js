const httpStatus = require('http-status');
const { promiseHelper } = require('../../helpers');
const db = require('../../database');
const { logger, Joi, currency: currencyService } = require('../../services');
const { Op } = require('sequelize');

/**
 * getProductById
 * @description - Get a product by its ID
 * @returns {Promise}
 * 
 */

module.exports.getProductById = (data) => new Promise(async (resolve, reject) => {
  try {
    logger.verbose('Controllers > Products > Products > Products Functions > getProductById')

    const { productId, currency } = data;

    const Schema = Joi.object({
      productId: Joi.string().required(),
      currency: Joi.string().default('USD').optional()
    })

    const { error, value } = Schema.validate(data, {
      stripUnknown: true
    })

    if (error) {
      return reject(promiseHelper(httpStatus.BAD_REQUEST, error.message, error));
    }

    let product = await db.products.findOne({ where: { id: productId } })

    if (!product) {
      return reject(promiseHelper(httpStatus.NOT_FOUND, 'Product not found'));
    }

    product.productViewed = product.productViewed + 1;

    await product.save();


    if (currency && currency !== 'USD') {
      const convertedPrice = await currencyService({ source_currency: 'USD', target_currency: currency, amount: product.price });
      // add new key to product object

      product = {
        ...product.dataValues,
        priceInCAD: String(convertedPrice.toFixed(2))
      }
    }

    return resolve(promiseHelper(httpStatus.OK, 'Product found', product));


  } catch (error) {

    logger.error(error)

    return reject(promiseHelper(httpStatus.INTERNAL_SERVER_ERROR, error.message, error));
  }

})

/**
 * getProductViewCount
 * @description - Get the total view count of all products
 * @returns {Promise}
 * 
 */

module.exports.getProductViewCount = ({
  limit = 5,
  currency
}) => new Promise(async (resolve, reject) => {
  try {
    logger.verbose('Controllers > Products > Products > Products Functions > getProductViewCount')

    let mostViewedProducts = await db.products.findAll({
      where: {
        productViewed: {
          [Op.gt]: 0
        }
      },
      order: [
        ['productViewed', 'DESC']
      ],
      limit: Number(limit)
    });

    if (currency && currency !== 'USD') {
      // add new key to product object
      const convertedPrice = await currencyService({ source_currency: 'USD', target_currency: currency, amount: 1 });

      mostViewedProducts = await Promise.all(mostViewedProducts.map(async (product) => {
        return {
          ...product.dataValues,
          priceInCAD: String((product.price * convertedPrice).toFixed(2))
        }
      }))
    }

    return resolve(promiseHelper(httpStatus.OK, 'Product view count', mostViewedProducts));

  } catch (error) {

    logger.error(error)

    return reject(promiseHelper(httpStatus.INTERNAL_SERVER_ERROR, error.message, error));
  }
})
