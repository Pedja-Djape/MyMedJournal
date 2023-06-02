var createError = require('http-errors');
const express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dbConnect = require('./db/dbConnect');


// setup routers
const indexRouter = require('./routes/index');
const papersRouter = require('./routes/papers');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

var app = express();
dbConnect();

var corsOptions = {
  origin: ["http://localhost:3000"], // allow from this origin
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/papers',papersRouter);
app.use('/auth', authRouter);
app.use('/notes', notesRouter);


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
