// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
let databaseTableName = process.env.DatabaseTable;
var AWS = require("aws-sdk");
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  var params = {
    TableName: databaseTableName,
    Item: {
      ID: { S: "name" },
    },
  };
  try {
    // const ret = await axios(url);
    data = await ddb.putItem(params).promise();
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
        // location: ret.data.trim()
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
