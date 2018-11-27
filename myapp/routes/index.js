const express = require('express');
const router = express.Router();
const db = require('./dataBase');
/**
 * 博客首页
 * 功能
 * 日志分页
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});
/**
 * 日志详情
 * 功能
 * 评论日志
 * 上一篇
 * 下一篇
 */
router.get('/journal', function(req, res, next) {
  res.render('journal', { title: '日志详情' });
});

/*---------------------------------------------------------------------管理员---------------------------------------------------------*/
//登录页面
router.get('/login', function(req, res, next) {
  res.render('login', { title: '管理员登录' });
});
//登录拦截
router.get('/admin/*', function(req, res, next) {
  if(req.session.userName){
    next();
  }else{
    res.redirect('/login');
  }
});
/**
 * 管理员首页
 * 功能：
 * 退出
 * 删除日志
 * 编辑日志
 * 添加日志
 * 日志分页
 */
router.get('/admin/index', function(req, res, next) {
  let sql = 'SELECT * FROM article WHERE userid = ?';
  db.query(sql,[req.session.userName]).then((data)=>{
    res.render('adminIndex', { title: '后台管理' ,data: data});
  })
});
/**
 * 管理员编辑日志页面
 * 功能：
 * 根据日志id确认是修改还是新增
 */
router.get('/admin/editJournal', function(req, res, next) {
  let id = req.query.id;
  let data = [{
    title : '',
    id:null,
    details:'',
    time:'',
    userid:'',
    intro:''
  }]
  if(id  != undefined){
    let sql = 'SELECT * FROM article WHERE userid = ? AND id = ?';
    db.query(sql,[req.session.userName,id]).then((data)=>{
      data  = data;
      res.render('editJournal', { title: '编辑日志' ,data: data});
    })
  }else{
    res.render('editJournal', { title: '编辑日志',data:data });
  }
});
module.exports = router;
