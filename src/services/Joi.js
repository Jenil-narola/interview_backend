let JoiBase = require('joi');
JoiBase = JoiBase.extend(require('@joi/date'));
const Joi = JoiBase.defaults((schema) => schema.options({
    // errors: {
    //     wrap: {
    //         array: false
    //     }
    // }
    messages: ({
        'string.guid': '{{#label}} must be a valid UUID',
    })
}));

/**
 * @return {import('joi')}
 */
module.exports = Joi;
