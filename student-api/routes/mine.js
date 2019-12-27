var express = require('express');
var router = express.Router();
var db = require('../modules/db2');
var mongodb = db.mongodb;
var MongoClient = db.MongoClient;
var dbName = db.dbName;
var uri = db.uri;

// 获取工作列表
router.get('/getmine', (req, res, next) => {
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return res.json({
        code: 201,
        message: '错误',
        err
      });
    }
    console.log('33333')
    client.db(dbName).collection('mine').find().toArray((err, result) => {
      if (err) {
        return res.json({ code: 202, message: err })
      }
      console.log(result)
      res.json({
        code: 200,
        message: '成功',
        result
      })
    });

  })
});

// 删除/工作内容
router.delete('/deletemine', (req, res, next) => {
  console.log('11', req.body._id)
  console.log('22', req.param)
  console.log('33', req.data)
  console.log('11111')
  MongoClient.connect(
    uri,  
    { useUnifiedTopology: true }, 
    (err, client) => {
    if(err){
      return res.json({ code: 202, message: '错误', err })
    }
    client.db(dbName).collection('mine').findOneAndDelete({_id: new mongodb.ObjectID(req.body._id)})
    .then(result => {
      return res.json({code: 200, message: '成功', data: result})
    }).catch(err => {
      return res.json({code: 201, message: err})
    })
  })
})

// 完成工作内容
router.put('/putmine', (req, res, next) => {
  console.log('0000000000000000000000000000000000000')
  console.log(req.bady)
  MongoClient.connect(
    uri, 
    { useUnifiedTopology: true }, 
    (err, client) => {
      if(err){
        return res.json({ code: 202, message: '错误', err })
      }
      client.db(dbName).collection('mine').findOneAndUpdate({ _id: new mongodb.ObjectID(req.body.id)}, {
        $set: { token: true }
      }, (err, result) => {
        if(err){
          return res.json({code: 201, message: err})
        }
        res.json({code: 200, message: '成功', result})
      })
  })
})

// 获取个人信息
router.get('/getinfor', (req, res, next) => {
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if(err){
      return res.json({code: 201, message: err})
    }
    client.db(dbName).collection('information').find({}).toArray((err, result) => {
      if(err){
        return res.json({code: 202, message: err})
      }
      res.json({code: 200, message: '成功', result})
    })
  })
})
module.exports = router;