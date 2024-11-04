
const { isString, isUndefined, isEmpty } = require('lodash');
const { logger, Joi, nodemailerSendGrid, DayJS } = require('../../../services');
const JWT = require('../../../services/jwt');
const { promiseHelper, emailTemplateHelper, getENV } = require('../../../helpers');
const db = require('../../../database');
const { accountEmailVerificationType } = require('../../../common');
const httpStatus = require('http-status');
const { randomDigit } = require('../../../utils/random');
const { Op } = require('sequelize');


/**
 * @author Jenil Narola
 * @description Generate Authentication Token for user
 * @param {{
 * email: string,
 * userId: string,
 * userRole: string,
 * authToken: string|number
 * }} data
 * 
 * @returns {Promise<string>|Promise<PromiseRejectedResult>}
 */
module.exports.generateAuthToken = (data) => new Promise((resolve, reject) => {
  logger.silly('Controllers > Users > Account > Account Helpers > generateAuthToken')
  let { email, userId, userRole, authToken } = data;

  const Schema = Joi.object({
    email: Joi.string().required(),
    userId: Joi.string().required(),
    userRole: Joi.string().required(),
    authToken: Joi.string().required()
  })

  const { error, value } = Schema.validate(data, {
    stripUnknown: true
  })

  if (error) {
    return reject(promiseHelper(httpStatus.BAD_REQUEST, error.message, error));
  }

  resolve(JWT.sign({
    email,
    userId,
    userRole,
    authToken
  }, {
    subject: 'Authorization Token',
  }));

});
