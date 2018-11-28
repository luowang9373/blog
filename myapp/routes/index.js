const express = require('express');
const router = express.Router();
const db = require('./dataBase');

Date.prototype.Format = function(fmt){  
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  
/**
 * 博客首页
 * 功能
 * 日志分页
 */
router.get('/', function(req, res, next) {
  //查询所有日志列表
  let sql = 'SELECT * FROM article order by time desc';
  db.query(sql,[req.session.userName]).then((data)=>{
    res.render('index', { title: '首页' ,data: data});
  })
});
/**
 * 日志详情
 * 功能
 * 评论日志
 * 上一篇
 * 下一篇
 */
router.get('/journal', function(req, res, next) {
  //根据日志id查询日志信息
  let sql = 'SELECT * FROM article WHERE id = ?';
  db.query(sql,[req.query.id]).then((data)=>{
    data[0].time =  new Date(data[0].time).Format("yyyy-MM-dd"); 
    res.render('journal', {data: data});
  })
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
  let sql = 'SELECT * FROM article WHERE userid = ? order by time desc';
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
