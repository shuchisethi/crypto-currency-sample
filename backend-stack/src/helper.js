function findMinMaxPrice(quotes, callback) {
  let minPrice = quotes[0].price;
  let maxPrice = quotes[0].price;
  let minIndex = quotes[0].time;
  let maxIndex = quotes[0].time;

  for (let i = 1, len = quotes.length; i < len; i += 1) {
    const val = quotes[i].price;
    if (val < minPrice) {
      minPrice = val;
      minIndex = quotes[i].time;
    }
    if (val > maxPrice) {
      maxPrice = val;
      maxIndex = quotes[i].time;
    }
  }
  if (minIndex < maxIndex) {
    callback({
      buy: { price: minPrice, time: minIndex },
      sell: { price: maxPrice, time: maxIndex },
    });
  } else {
    const quotesModified = quotes.filter(e => e.time !== minIndex);
    findMinMaxPrice(quotesModified, callback);
  }
}

function requestBody(event) {
  const { body } = event;
  if (body !== undefined && body !== null && body !== '') {
    try {
      return JSON.parse(body);
    } catch (e) {
      throw e;
    }
  }

  return null;
}

function respondWithError(errorCode, errorMsg) {
  const errorResponse = { result: 'error', error: errorMsg };

  return {
    statusCode: errorCode,
    body: JSON.stringify(errorResponse),
  };
}

function respondWith(responseMessage, responseHeaders) {
  if (responseMessage === undefined) {
    responseMessage = {};
  }
  const successResponse = { result: 'ok', payload: { message: responseMessage } };
  const response = {
    statusCode: 200,
    body: JSON.stringify(successResponse),
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    },
  };

  return response;
}

module.exports = {
  respondWith,
  respondWithError,
  findMinMaxPrice,
  requestBody,
};
