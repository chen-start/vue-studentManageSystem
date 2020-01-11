var express = require('express');
var router = express.Router();
var db = require('../modules/db3');
var mongodb = db.mongodb;
var MongoClient = db.MongoClient;
var dbName = db.dbName;
var uri = db.uri;

router.get('/getinformation', (req, res, next) => {
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({code: 201, message: err})
        }
        client.db(dbName).collection('information').find({}).toArray((err, result) => {
            if(err){
                return res.json({code: 201, message: err})
            }
            res.json({code: 200, message: '成功', result})
        })
    })
})

router.put('/putinformation', (req, res, next) => {
    let id = req.body.id;
    let value = req.body.value;
    console.log(req.body)
    console.log('1111111111')
    if(!id){
        res.json({code: 201, message: '参数id不能为空'})
    }
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({code: 201, message: err})
        }
        client.db(dbName).collection('information').findOneAndUpdate({ _id: new mongodb.ObjectID(req.body.id) }, {$set: {situation: value}}).then(result => {
            return res.json({code: 200, message: '成功', result})
        }).catch(err => {
            return res.json({code: 201, message: err})
        })
    })
})

// 获取工作
router.get('/getwork', (req, res, next) => {
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({code: 201, message: err})
        }
        client.db(dbName).collection('work').find({}).toArray((err, result) => {
            if(err){
                return res.json({code: 201, message: err})
            }
            res.json({code: 200, message: '成功', result})
        })
    })
});

// 获取教学
router.get('/getteach', (req, res, next) => {
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({code: 201, message: err})
        }
        client.db(dbName).collection('teach').find({}).toArray((err, result) => {
            if(err){
                return res.json({code: 201, message: err})
            }
            res.json({code: 200, message: '成功', result})
        })
    })
});

// 获取家庭
router.get('/getfamily', (req, res, next) => {
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({code: 201, message: err})
        }
        client.db(dbName).collection('family').find({}).toArray((err, result) => {
            if(err){
                return res.json({code: 201, message: err})
            }
            res.json({code: 200, message: '成功', result})
        })
    })
});

// 获取社区
router.get('/getcommunity', (req, res, next) => {
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({code: 201, message: err})
        }
        client.db(dbName).collection('community').find({}).toArray((err, result) => {
            if(err){
                return res.json({code: 201, message: err})
            }
            res.json({code: 200, message: '成功', result})
        })
    })
})

router.post('/addThing', (req, res, next) => {
    let thing = req.body;
    console.log(req.body);
    if(!req.body.date || !req.body.name || !req.body.thing){
        res.json({code: 201, message: '参数date，thing，name不能为空！'})
    }
    let Expression=/^((((1[6-9]|[2-9]\d)\d{2})(\/|\-)(0?[13578]|1[02])(\/|\-)(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(\/|\-)(0?[13456789]|1[012])(\/|\-)(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})(\/|\-)0?2(\/|\-)(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
    let dateExp = new RegExp(Expression);
    if(dateExp.test(req.body.date) == false){
        return res.json({code: 201, message: '参数date必须是日期形式!'});
    }
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if(err){
            return res.json({code: 201, message: err});
        }
        client.db(dbName).collection('information').insertOne(thing).then(result => {
            return res.json({code: 200, message: '成功', result})
        }).catch(err => {
            return res.json({code: 201, message: err})
        })
    })
})

module.exports = router;