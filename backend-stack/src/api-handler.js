const HELPER = require('./helper');
const rates = require('../resources/currency-rates');


module.exports.bestProfit = async (event) => {
  let currencyRates = event.currencyRates; // when lambda is invoked for integration test
  if (currencyRates === undefined) { // when authoriser invokes the lambda
    currencyRates = rates.currencyRates;
  }
  if (currencyRates.length === 0) {
    return HELPER.respondWithError(400, 'Invalid Input');
  }
  const response = [];
  currencyRates.forEach((item) => {
    if ('date' in item && 'currency' in item && 'quotes' in item) {
      const { date, currency, quotes } = item;
      const responseObj = {};
      responseObj.date = date;
      responseObj.currency = currency;
      HELPER.findMinMaxPrice(quotes, (respPrice) => {
        responseObj.buy = respPrice.buy;
        responseObj.sell = respPrice.sell;
        responseObj.profit = Math.round((respPrice.sell.price - respPrice.buy.price) * 100) / 100;
      });
      response.push(responseObj);
    }
  });
  return HELPER.respondWith(response);
};
