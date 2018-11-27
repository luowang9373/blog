const express = require('express');
const db = require('./dataBase');
const router = express.Router();


router.post('/login', function(req, res, next) {
  let data = null;
  let userName = req.body.userName.toString();
  let passWord = req.body.passWord.toString();
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
router.post('/exit', function(req, res, next) {
  req.session.destroy(function (err) {
    if(err) console.log("session销毁失败.");
    else res.json({exit:true});
  });
});
module.exports = router;
