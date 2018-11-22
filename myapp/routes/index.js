var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/admin/*', function(req, res, next) {
  console.log(12)
  next()
  //res.render('index', { title: 'Express' });
});

router.get('/admin/index', function(req, res, next) {
  console.log(34)
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
module.exports = router;
