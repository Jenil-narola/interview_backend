
/***
 * @description - Returns the conversion rate, info is retrieved from ExchangeRatesAPI data
 * @param {string} currency - The currency to convert to, uses ISO 4217
 */

const logger = require("../winston");
const axios = require("axios");

module.exports = async ({ source_currency, target_currency, amount }) => {

  try {

    console.log({ source_currency, target_currency, amount });

    const result = await axios.get(`http://apilayer.net/api/live?access_key=${process.env.CURRENCY_LAYER_API_KEY}&currencies=${target_currency}&source=${source_currency}&format=1`);
    console.log(result);

    return result.data.quotes[`${source_currency}${target_currency}`] * amount;

  }
  catch (error) {
    logger.error("Service [Exchange Rates]: " + ((error.response && error.response.data) || "Error"));
    return false;
  }

}
