var express = require('express');
var router = express.Router();
var db = require('../modules/db3');
var mongodb = db.mongodb;
var MongoClient = db.MongoClient;
var dbName = db.dbName;
var uri = db.uri;

router.post('/powerwatch', (req, res, next) => {
    let data = req.body.watchpower;
    if (data) {
        console.log('11111')
        MongoClient.connect(uri, (err, client) => {
            if (err) {
                return res.json({ code: 201, message: err })
            }
            client.db(dbName).collection('powerwatch').findOne({ data }).toArray((err, result) => {
                if (err) {
                    return res.json({ code: 201, message: err })
                }
                res.json({ code: 200, message: '成功', result })
            })
        })
    } else {
        console.log('22222')
        MongoClient.connect(uri, (err, client) => {
            if (err) {
                return res.json({ code: 201, message: err })
            }
            client.db(dbName).collection('powerwatch').find({}).toArray((err, result) => {
                if (err) {
                    return res.json({ code: 201, message: err })
                }
                res.json({ code: 200, message: '成功', result })
            })
        })
    }

})

module.exports = router;