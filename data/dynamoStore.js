const AWS = require("aws-sdk");
// let the sdk know which region your dynamodb is in
AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function putItem(table, item) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      Item: item,
    };

    dynamodb.put(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// You can pull all items from a table using dynamodb.scan(), but it
// only returns 1mb of data at a time. If you're db has more data,
// you'd need to call it recursively through your table offset by an index.
// The method below is a naive implementation to avoid recursive calls.

async function getAllItems(table) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
    };

    dynamodb.scan(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
}

async function getItem(table, idKey, id) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      Key: {
        [idKey]: id,
      },
    };

    dynamodb.get(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Item);
      }
    });
  });
}

module.exports = {
  putItem,
  getAllItems,
  getItem,
};
