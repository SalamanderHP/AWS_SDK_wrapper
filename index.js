require('dotenv').config();
const AWS = require("aws-sdk");

AWS.config.apiVersions = {
  sqs: '2012-11-05',
  // other service API versions
};

AWS.config.update({
  "accessKeyId": process.env.ACCESS_KEY,
  "secretAccessKey": process.env.SECRET_ACCESS_KEY,
  "region": process.env.REGION
})

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const s3 = new AWS.S3({
  accessKeyId: process.env[`${process.env.MODE}_S3_ACCESS_KEY_ID`],
  secretAccessKey: process.env[`${process.env.MODE}_S3_SECRET_KEY`],
});

module.exports = {
  sqs,
  s3
}
