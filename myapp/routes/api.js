const express = require('express');
const db = require('./dataBase');
const router = express.Router();

/**
 * 登录
 */
router.post('/login', function(req, res, next) {
  let data = null;
  let userName = req.body.userName;
  let passWord = req.body.passWord;
  let sql = 'SELECT * FROM user WHERE userName = ? AND passWord = ? ';
  db.query(sql,[userName,passWord]).then((data)=>{
    if(data.length==1){
      req.session.userName = data[0].id; // 登录成功，设置 session
      res.json({login:true});
    }else{
      delete req.session.userName;
      res.json({login:false});//返回登录失败
    }
  })
});
/**
 * 退出
*/
router.post('/exit', function(req, res, next) {
  req.session.destroy(function (err) {
    if(err) console.log("session销毁失败.");
    else res.json({exit:true});
  });
});
/**
 * 保存日志
 */
router.post('/saveJournal', function(req, res, next) {
  let id = req.body.data.id;
  let title = req.body.data.title;
  let intro = req.body.data.intro;
  let details = req.body.data.details;
  let userid = req.session.userName;
  let time = new Date();
  if(id ==  null){//添加数据
    let sql ='INSERT INTO article(title,intro,time,userid,details) values(?,?,?,?,?)';
    db.query(sql,[title,intro,time,userid,details]).then((data)=>{
      res.json({success:true});
    })
  }else{//修改数据
    let sql = 'UPDATE article SET title = ? ,intro = ? ,time = ?,details = ? WHERE id = ?';
    db.query(sql,[title,intro,time,details,id]).then((data)=>{
      res.json({success:true});
    })
  }
});
module.exports = router;
