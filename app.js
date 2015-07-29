var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var cors = require('cors');
/* SCRAP
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var exphbs  = require('express-handlebars');
*/

// *******************ROUTES*************************
// MongoDB routes
var bookServices = require('./routes/bookServices');
var otherServices = require('./routes/otherServices');
var userServices = require('./routes/userServices');

// Mail routes
var sendMail = require('./routes/sendMail');

// Authentication routes
var login = require('./routes/login');

// Search routes
var bookDetail = require('./routes/bookDetail');

// **************************************************


var app = express();

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/bookDetail', bookDetail);
app.use('/sendMail', sendMail);
app.use('/bookServices', bookServices);
app.use('/otherServices', otherServices); // handles 'other' items
app.use('/userServices', userServices);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err);
});

module.exports = app;
