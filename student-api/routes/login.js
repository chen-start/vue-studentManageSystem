var express = require('express');
var router = express.Router();
var md5 = require('md5');
var db = require('../modules/db');
var mongodb = db.mongodb;
var MongoClient = db.MongoClient;
var dbName = db.dbName;
var uri = db.uri;
var table = 'users';

/* 注册接口 */
router.post('/register', function (req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  var nickname = req.body.nickname;
  if (!account || !password || !nickname) {
    return res.json({ code: 201, message: '参数有误！account,password,nickname都不能为空！' });
  }
  // 把密码加密
  var md5_password = md5(password);
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return res.json({ code: 201, message: err });
    }
    var user = {
      account,
      password: md5_password,
      nickname: nickname
    }
    client.db(dbName).collection(table).insertOne(user, (err, result) => {
      if (err) {
        return res.json({ code: 201, message: err });
      }
      res.json({ code: 200, message: '注册成功' });
    })
  })
});

// 登录接口
router.post('/adminlogin', function (req, res, next) {
  console.log(req.body);
  var account = req.body.account;
  var password = req.body.password;
  if (!account || !password) {
    return res.json({ code: 201, message: '参数有误！account,password都不能为空！' });
  }
  // 把密码加密
  var md5_password = md5(password);
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return res.json({ code: 201, message: err });
    }
    client.db(dbName).collection(table).findOne({ account, password: md5_password }, (err, result) => {
      if (err) {
        return res.json({ code: 201, message: err });
      }
      // 为了安全，把密码删除，不返回给客户端。
      delete result.password;
      // 把账号存储cookie中。
      res.cookie('account', result.account);
      res.json({ code: 200, message: '登录成功', user: result });
    })
  })
});

// 注销接口
router.post('/logout', function (req, res, next) {
  console.log(req.body)
  var account = req.body.account;
  if (!account) {
    return res.json({ code: 201, message: '参数有误！account都不能为空！' });
  }
  res.clearCookie('account');
  res.json({ code: 200, message: '注销成功' })
});

module.exports = router;
