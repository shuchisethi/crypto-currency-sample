function generatePolicy(principalId, effect, resource) {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }],
    },
  };
}

module.exports.handler = (event, context, callback) => {
  if (typeof event.authorizationToken === 'undefined') {
    callback('Unauthorized');
    return;
  }

  const authorizationValues = event.authorizationToken.split(' ');
  if (authorizationValues.length !== 2 || authorizationValues[0].trim() !== 'Bearer') {
    callback('Unauthorized');
    return;
  }

  const token = authorizationValues[1].trim();

  if (token === '4674cc54-bd05-11e7-abc4-cec278b6b50a') {
    callback(null, generatePolicy('user', 'Allow', event.methodArn));
  } else {
    callback('Unauthorized');
  }
};
