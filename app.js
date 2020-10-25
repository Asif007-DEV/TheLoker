var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
var mongoose = require('mongoose');

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const logoutRouter = require('./routes/logout');
const categoryRouter = require('./routes/addCategory');
const showCategoriesRouter = require('./routes/showCategories');
const deleteCategoryRouter = require('./routes/deleteCategory');
const addPasswordRouter = require('./routes/addPassword');
const showPasswordRouter = require('./routes/showPassword');


var app = express();

mongoose.connect('mongodb://localhost:27017/The_Locker',{
    useNewUrlParser: true,useUnifiedTopology:true
}).then(()=>console.log('Database Connected'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('kjbisjbdivjbib'));
app.use(session({
  secret : "kjbisjbdivjbib",
  maxAge : 3600000,
  resave : true,
  saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function(req, res, next){
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message =req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/logout', logoutRouter);
app.use('/category',categoryRouter);
app.use('/showCategories',showCategoriesRouter);
app.use('/showCategories/delete/', deleteCategoryRouter);
app.use('/addPassword',addPasswordRouter);
app.use('/showPassword', showPasswordRouter);


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
