/**
 * @author Jenil Narola
 * @description It will return the value of the environment variable based on environment variable name
 */

const logger = require('../services/winston')

const LocalVariables = ['development', 'production']

module.exports = function (variable) {
    if (process.env[variable]) {
        logger.silly(`Helper [ENV][FOUND]: ${variable}`)
        return process.env[variable]
    }

    if (process.env[variable + '_' + process.env.NODE_ENV]) {
        logger.silly(`Helper [ENV][FOUND]: ${variable + '_' + process.env.NODE_ENV}`)
        return process.env[variable + '_' + process.env.NODE_ENV]
    }

    // Find All parent function name 
    const stackArray = new Error().stack.split('\n').map((item) => {
        return item.trim()
    }).slice(1)

    if (!LocalVariables.includes(variable)) {
        logger.warn(`Helper [ENV][NOT_FOUND]: ${variable} or ${variable + '_' + process.env.NODE_ENV}`, stackArray)
        return null;
    }

    return null;
}