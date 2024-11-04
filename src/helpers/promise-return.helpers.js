const httpStatus = require("http-status");
const { pickBy } = require("lodash");

/**
 * @author Jenil Narola
 * @description Format success or error object for response
 * @param {number| Error | import("joi").ValidationError} status HTTP Status Code or Error Object
 * @param {string} message Message for response
 * @param {object| Error | import("joi").ValidationError} data Data for response
 * @param {string} customCode Custom Code for response
 * @param {object} metadata Metadata for response
 * @typedef {{status: number, message: string, data: object, customCode: string, metadata: object}} PromiseReturnType
 * @returns {PromiseReturnType}
 */
module.exports = (status, message, data, customCode, metadata) => {
    let returnObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR
    }

    if (status instanceof Error && status.isJoi) {
        returnObject.status = httpStatus.BAD_REQUEST
        returnObject.message = status.message
        returnObject.data = status.details
        returnObject.customCode = customCode
        returnObject.metadata = metadata
        return returnObject
    } else if (status instanceof Error) {
        returnObject.status = httpStatus.INTERNAL_SERVER_ERROR
        returnObject.message = status.message
        returnObject.data = status
        returnObject.customCode = status.code || customCode
        returnObject.metadata = status.metadata || metadata
        return returnObject
    } else {
        returnObject.status = status || undefined;
        returnObject.message = message || undefined;
        returnObject.data = data || undefined;
        returnObject.customCode = customCode || undefined;
        metadata ? returnObject.metadata = metadata : undefined;
        return pickBy(returnObject);
    }
}