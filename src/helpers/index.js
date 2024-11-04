// Export All Helper Functions
module.exports.promiseHelper = require('./promise-return.helpers');
module.exports.responseHelper = require('./response.helpers');
module.exports.getENV = require('./get-env');

const { v5: UUID, v4, validate } = require('uuid');
module.exports.generateUUID = () => UUID('https://app.lynx.com', v4())
module.exports.isUUID = validate;

module.exports.PaginationHelper = require('./pagination.helpers');
module.exports.AxiosErrorParser = (error) => {
    if (error.response) {
        return error.response.data;
    } else if (error.request) {
        return error.request;
    } else {
        return error.message;
    }
}