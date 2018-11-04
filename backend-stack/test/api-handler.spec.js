const HANDLER = require('../src/api-handler');
const { currencyRates } = require('./fixtures/currency-rates');

describe('API HANDLER', () => {

  describe('when request to determine best-profit is received', () => {
    it('returns response with best-profit per currency', async () => {
      const response = await HANDLER.bestProfit({ currencyRates });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body).payload.message).toContainEqual(expect.objectContaining({
        date: '20180507',
        currency: 'BTC',
      }));
    });
  });

  describe('when empty object is passed to determine best-profit', () => {
    it('returns invalid input message', async () => {
      const response = await HANDLER.bestProfit({ currencyRates: [] });
      expect(response.statusCode).toEqual(400);
      expect(JSON.parse(response.body).error).toMatch(/Invalid/);
    });
  });
});
