var express = require('express');
var router = express.Router();
var db = require('../modules/db2');
var mongodb = db.mongodb;
var MongoClient = db.MongoClient;
var dbName = db.dbName;
var uri = db.uri;

// 获取行程列表
router.get('/gettrip', (req, res, next) => {
    MongoClient.connect(
        uri,
        { useUnifiedTopology: true },
        (err, client) => {
            if (err) {
                return res.json({ code: 201, message: '错误', err })
            }
            client.db(dbName)
                .collection('minetrip')
                .find({})
                .toArray((err, result) => {
                    if (err) {
                        return res.json({ code: 202, message: err })
                    }
                    console.log(result);
                    res.json({ code: 200, message: '成功', result })
                })
        }
    )
})

// 完成行程
router.put('/puttrip', (req, res, next) => {
    console.log(req.body)
    console.log(req.body.id)
    MongoClient.connect(uri, {useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({ code: 201, message: '错误', err })
        }
        client.db(dbName).collection('minetrip').findOneAndUpdate({ _id: new mongodb.ObjectID(req.body.id)}, {$set: { token: true }}, (err, result) => {
            if(err){
                return res.json({code: 202, message: err})
            }
            res.json({code: 200, message: '成功', result})
        })
    })
})


module.exports = router;