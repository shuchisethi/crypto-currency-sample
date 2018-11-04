# NAB Coding Challenge -  Backend Stack

- Exposes a HTTP endpoint. This endpoint returns the best profit that can be made from buying currency at a given price and selling it later on same day

## Tech stack
* [Node](https://github.com/nodejs)
* [Serverless Framework](https://serverless.com/)
* AWS Lambda and API Gateway
* [JEST](https://jestjs.io/)
* [Eslint](https://eslint.org/)


## Solution

Have created an API using API Gateway.
 
The API invokes a lambda function which reads currency rates as input(resources/currency-rates.js) and returns the best profit that can be made from it.

Have also implemented a custom lambda authoriser since this API is publicly available.

 ```curl -i -H "Accept: application/json" -H "Content-Type: application/json" https://x1u1bfq6q1.execute-api.ap-southeast-2.amazonaws.com/dev/v1/best-profit --header "Authorization: Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a" ```

## Prerequisites

- AWS credentials and region for deployment are configured on your local system
- Latest node.js is globally installed on your system. This has been developed and tested on node v10.8.0 

To install node - ```sudo npm install -g```

## Setup
serverless: ```npm install -g serverless```

Node dependencies: 
```
npm install
```

## Deploying

- Deploying the code on AWS ```sls deploy -s dev```

## Removing

 ```sls remove -s dev```
 
## Running the tests
 
 ```npm run test```

## Linting
```npm run lint```



