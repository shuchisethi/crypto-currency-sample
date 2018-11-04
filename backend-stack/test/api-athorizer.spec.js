const AUTHORIZER = require('../src/api-authorizer');

describe('API Authorization', () => {
  describe('when authorisation token is invalid', () => {
    it('returns a Unauthorised response', async () => {
      const params = {
        authorizationToken: 'Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50A',
      };

      AUTHORIZER.handler(params, 'context', (status) => {
        expect(status).toEqual('Unauthorized');
      });
    });
  });

  describe('when authorisation token is valid', () => {
    it('provides the allow policy', async () => {
      const params = {
        authorizationToken: 'Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a',
      };

      AUTHORIZER.handler(params, 'context', (_, policy) => {
        expect(policy.policyDocument.Statement[0].Effect).toEqual('Allow');
      });
    });
  });
});
