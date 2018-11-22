var express = require('express');
var dataBase = require('./dataBase');
var router = express.Router();


router.post('/login', function(req, res, next) {
  var data = null;
  var userName = req.body.userName.toString();
  var passWord = req.body.passWord.toString();
  dataBase.login(userName,passWord).then((res)=>{
    console.log(res[0])
  });
  //console.log(data)
  res.json(data);
  //res.clearCookie();
  //res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
  //res.json(req.body);
  //res.send('r111');
});

module.exports = router;
