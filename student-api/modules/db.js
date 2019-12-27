const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbName = "studentdemo";
const uri = `mongodb://127.0.0.1:27017/${dbName}`;

module.exports = {
    mongodb,
    MongoClient,
    uri,
    dbName
}


