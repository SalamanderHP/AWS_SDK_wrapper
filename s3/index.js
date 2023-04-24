require('dotenv').config();
const { s3 } = require("./index")

const upload = async (file) => {
  try {
      let type = 'image/jpeg'
      let filename = ''

      const params = {
          Bucket: process.env.S3_BUCKET,
          Key: 'uploads/' + filename,
          Body: file.buffer,
          ACL: "public-read",
          'ContentType': type
      };
      let result = await new Promise((resolve, reject) => {
          s3.upload(params, (err, data) => {
              if (err) reject(err)
              resolve(data.Location)
          })
      });

      return result

  } catch (error) {
      throw error
  }
}

module.exports = {
  upload
}
