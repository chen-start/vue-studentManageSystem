var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var mongodb = db.mongodb;
var MongoClient = db.MongoClient;
var dbName = db.dbName;
var uri = db.uri;

/* GET home page. */
router.get('/', function (req, res, next) {
  
});


// 添加学生
router.post('/postStudent', (req, res, next) => {
  if (!req.body.sno || !req.body.name || !req.body.sex || !req.body.age || !req.body.birthday) {
    return res.json({ code: 201, message: '参数有误！sno,name,sex,age,birthday都不能为空！' });
  }
  if (!/^\d+$/.test(req.body.age)) {
    return res.json({ code: 201, message: '参数有误！age必须是一个数字！' });
  }
  if (!Date.parse(req.body.birthday)) {
    return res.json({ code: 201, message: '参数有误！birthday必须是一个日期格式！' });
  }
  var student = {
    sno: req.body.sno,
    name: req.body.name,
    sex: req.body.sex,
    age: req.body.age - 0,
    birthday: new Date(req.body.birthday)
  }

  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return res.json({ code: 201, message: err });
    }
    client.db(dbName).collection('students').insertOne(student, (err, result) => {
      if (err) {
        return res.json({ code: 201, message: err });
      }
      res.json({ code: 200, message: '添加成功' });
    })
  })
})
// 查询学生
router.get('/getStudent/:page?/:pageSize?', (req, res, next) => {
  var page = req.params.page - 0 || 1;
  var pageSize = req.params.pageSize - 0 || 10;
  var key = req.query.key || 'name';
  var value = req.query.value || '';
  var value2 = req.query.value2 || '';
  var condition = {};
  if (key === 'name' && value !== '') {
    condition.name = new RegExp(`${value}`, 'i');
  }
  if (key === 'sno' && value !== '') {
    condition.sno = new RegExp(`${value}`, 'i');
  }
  if (key === 'sex' && value !== '') {
    condition.sex = value;
  }
  if (key === 'age') {
    if (value !== '') {
      if (!/^\d+$/.test(value)) {
        return res.json({ code: 201, message: '参数有误！age必须是一个数字！' })
      }
      condition.age = { ...condition.age, $gte: value - 0 };
    }
    if (value2 !== '') {
      if (!/^\d+$/.test(value2)) {
        return res.json({ code: 201, message: '参数有误！age必须是一个数字！' })
      }
      condition.age = { ...condition.age, $lte: value2 - 0 };
    }
  }
  if (key === 'birthday') {
    if (value !== '') {
      if (!Date.parse(value)) {
        return res.json({ code: 201, message: '参数有误！birthday必须是一个日期格式！' })
      }
      condition.birthday = { ...condition.birthday, $gte: new Date(value) };
    }
    if (value2 !== '') {
      if (!Date.parse(value2)) {
        return res.json({ code: 201, message: '参数有误！birthday必须是一个日期格式！' })
      }
      condition.birthday = { ...condition.birthday, $lte: new Date(value2) };
    }
  }
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return res.json({ code: 201, message: err });
    }
    var col = client.db(dbName).collection('students');
    var total = col.countDocuments(condition);
    var students = col.find(condition).skip((page - 1) * pageSize).limit(pageSize).toArray();
    Promise.all([total, students]).then(results => {
      var pageCount = Math.ceil(results[0] / pageSize);
      res.json({
        code: 200,
        message: '成功',
        students: results[1],
        total: results[0],
        page,
        pageSize,
        pageCount
      })
    }).catch(err => {
      res.json({ code: 201, message: err });
    })
  });
})
// 根据id获取一个学生
router.get('/getOneStudent/:id', (req, res, next) => {
  if (!req.params.id) {
    return res.json({ code: 201, message: '参数有误！id不能为空！' })
  }
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return res.json({ code: 201, message: err });
    }
    client.db(dbName).collection('students').findOne({ _id: new mongodb.ObjectID(req.params.id) }, (err, student) => {
      if (err) {
        return res.json({ code: 201, message: err });
      }
      res.json({ code: 200, message: "查询成功", student });
    })
  })
})
// 修改学生  RESTful
router.post('/putStudent', (req, res, next) => {
  if (!req.body.id || !req.body.sno || !req.body.name || !req.body.sex || !req.body.age || !req.body.birthday) {
    return res.json({ code: 201, message: '参数有误！id,sno,name,sex,age,birthday都不能为空！' });
  }
  if (!/^\d+$/.test(req.body.age)) {
    return res.json({ code: 201, message: '参数有误！age必须是一个数字！' })
  }
  if (!Date.parse(req.body.birthday)) {
    return res.json({ code: 201, message: '参数有误！birthday必须是一个日期格式！' })
  }
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return res.json({ code: 201, message: err });
    }
    client.db(dbName).collection('students').findOneAndUpdate({ _id: new mongodb.ObjectID(req.body.id) }, { $set: { sno: req.body.sno, name: req.body.name, sex: req.body.sex, age: req.body.age - 0, birthday: new Date(req.body.birthday) } }, (err, result) => {
      if (err) {
        return res.json({ code: 201, message: err });
      }
      res.json({ code: 200, message: '修改成功' });
    })
  })
})
// 删除学生
router.delete('/deleteStudent', (req, res, next) => {
  if (!req.body.id) {
    return res.json({ code: 201, message: '参数有误！id参数不能为空' });
  }
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return res.json({ code: 201, message: err });
    }
    client.db(dbName).collection('students').findOneAndDelete({ _id: new mongodb.ObjectID(req.body.id) }, (err, result) => {
      if (err) {
        return res.json({ code: 201, message: err });
      }
      res.json({ code: 200, message: '删除成功' });
    })
  })
})
// 批量删除
router.delete('/deleteMoreStudent', (req, res, next) => {
  if (!req.body.ids) {
    return res.json({ code: 201, message: '参数有误！ids参数不能为空' });
  }
  var ids  = Array.from(req.body.ids);
  if (!(ids instanceof Array)) {
    return res.json({ code: 201, message: '参数有误！ids参数必须是数组' });
  }
  if (ids instanceof Array) {
    if(ids.length == 0){
      return res.json({ code: 201, message: '参数有误！ids数组不能为空' });
    }
  }
  var newIds = [];
  ids.forEach(v=>{
    newIds.push(new mongodb.ObjectID(v))
  })
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return res.json({ code: 201, message: err });
    }
    client.db(dbName).collection('students').deleteMany({ _id: { $in: newIds } }, (err, result) => {
      console.log(err);
      console.log(result);
      if (err) {
        return res.json({ code: 201, message: err });
      }
      res.json({ code: 200, message: '批量删除成功' });
    })
  })
})
module.exports = router;
