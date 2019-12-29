var express = require('express');
var router = express.Router();
var md5 = require('md5');
var db = require('../modules/db2');
var mongodb = db.mongodb;
var MongoClient = db.MongoClient;
var dbName = db.dbName;
var uri = db.uri;

router.post('/getuser', (req, res, next) => {
    // console.log('11111')
    // console.log('req.body', req.body)
    let name = req.body.condition;
    // console.log('2222')
    // console.log('name', name)
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            return res.json({ code: 201, message: err })
        }
        if (!name) {
            client.db(dbName).collection('users').find().toArray((err, result) => {
                if (err) {
                    return res.json({ code: 201, message: err })
                }
                res.json({ code: 200, message: '成功', result })
            })
        } else {
            client.db(dbName).collection('users').find({ name }).toArray((err, result) => {
                if (err) {
                    return res.json({ code: 201, message: err })
                }
                res.json({ code: 200, message: '成功', result })
            })
        }

    })
})

router.delete('/deleteuser', (req, res, next) => {
    console.log(req.body);
    console.log('1111')
    let id = req.body.id;
    console.log('2222')
    if (!id) {
        return res.json({ code: 201, message: 'id不能为空!' })
    }
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            return res.json({ code: 201, message: err })
        }
        client.db(dbName).collection('users').findOneAndDelete({ _id: new mongodb.ObjectID(id) }, (err, result) => {
            if (err) {
                return res.json({ code: 201, message: err })
            }
            res.json({ code: 200, message: '删除成功', result })
        })
    })
})

router.put('/putuser', (req, res, next) => {
    if (!req.body.sno || !req.body.name || !req.body.sex || !req.body.age || !req.body.position) {
        return res.json({ code: 201, message: '参数有误！sno,name,sex,age,position都不能为空！' });
    }
    if (!/^\d+$/.test(req.body.age)) {
        return res.json({ code: 201, message: '参数有误！age必须是一个数字！' });
    }
    let user = {
        sno: req.body.sno,
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        sex: req.body.sex
    }
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            return res.json({ code: 201, message: err })
        }
        client.db(dbName).collection('users').insertOne(user, (err, result) => {
            if (err) {
                return res.json({ code: 201, message: err })
            }
            res.json({ code: 200, message: '成功', result })
        })
    })
})

module.exports = router;