const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const api = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('md5'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session ({
    secret:'secret',
    resave:true,
    saveUninitialized: false,// 是否保存未初始化的会话
    cookie: {secure:false,maxAge:50000000}, /*第一个参数：只有在https才可以访问cookie；第二个参数：设置cookie的过期时间*/
    rolling:true,/*只要页面在操作就不会过期，无操作5秒后过期*/
}))

app.use('/', indexRouter);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
