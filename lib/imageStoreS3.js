const AWS = require("aws-sdk");
const s3 = new AWS.S3();

module.exports.save = (name, data) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "pizza-luvrs-remy",
      Key: `pizzas/${name}.png`,
      Body: Buffer.from(data, "base64"),
      ContentEncoding: "base64", // so s3 will know how to decode the body
      ContentType: "image/png",
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(`//pizza-luvrs-remy.s3.amazonaws.com/${params.Key}`);
      }
    });
  });
};
