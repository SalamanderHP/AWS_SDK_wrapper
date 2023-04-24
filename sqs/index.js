require('dotenv').config();
const { sqs } = require("../index")

const sendMessage = async (message) => {
  try {
    let params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: process.env.QUEUE_NAME
    };

    await sqs.sendMessage(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    }).promise()
  } catch (err) {
    throw err;
  }
}

const pullMessage = async () => {
  try {
    let params = {
      QueueUrl: process.env.QUEUE_NAME,
      MessageAttributeNames: [
        'All',
      ],
      MaxNumberOfMessages: 10
    }

    let msg = await sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else {
        if (data.Messages?.length === 0) return ""

        let deleteParams = data.Messages?.map(msg => {
          return {
            QueueUrl: process.env.QUEUE_NAME,
            ReceiptHandle: msg?.ReceiptHandle
          }
        })

        if (deleteParams && deleteParams.length > 0) {
          deleteParams.map(params => {
            sqs.deleteMessage(params, function(err, data) {
              if (err) {
                console.log("Delete Error", err);
              } else {
                console.log("Message Deleted", data);
              }
            });
          })
        }

        let msgData = data?.Messages?.map(message => {
          return message.Body;
        })

        return msgData;
      }
    }).promise()

    return msg;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  sendMessage,
  pullMessage
}
