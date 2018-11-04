const HELPER = require('../src/helper');
const { currencyRates } = require('./fixtures/currency-rates');

describe('API HANDLER', () => {
  describe('when price list of currencies is provided', async() => {
    it('returns buying price and selling price along with time of each', () => {
      HELPER.findMinMaxPrice(currencyRates['0'].quotes, (respPrice) => {
        expect(respPrice.buy.price).toEqual('34.98');
        expect(respPrice.sell.price).toEqual('37.01');
        expect(respPrice.buy.time).toEqual('0915');
        expect(respPrice.sell.time).toEqual('1230');
      });
    });
  });
});
