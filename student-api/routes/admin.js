var express = require('express');
var router = express.Router();
var db = require('../modules/db2');
var mongodb = db.mongodb;
var MongoClient = db.MongoClient;
var dbName = db.dbName;
var uri = db.uri;

// 获取登录信息
router.post('/getadmin', (req, res, next) => {
    // console.log(req.body)
    let admin = req.body;
    console.log('11111111111111111111');
    console.log(admin)
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({code: 201, message: err})
        }
        client.db(dbName).collection('admin').find({admin}).toArray((err, result) => {
            if(err){
                return res.json({code: 201, message: err});
            }
            res.json({code: 200, message: '成功', result});
        })
    })
})

// 注册
router.put('/putadmin', (req, res, next) => {
    let newAdmin = req.body;
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({code: 201, message: err})
        }
        client.db(dbName).collection('admin').insertOne(newAdmin).then(result => {
            res.json({code: 200, message: '成功'});
        }).catch(err => {
            return res.json({code: 201, message: err});
        })
    })
})

module.exports = router;