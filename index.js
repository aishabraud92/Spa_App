require('dotenv').config();
require
var bodyParser = require('body-parser');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var passport = require('./config/passportConfig');

var session = require('express-session');
var momentTimzone = require('moment-timezone');
var moment = require('moment');
var appointment = require('../models/appointment');
var app = express();

var getTimeZones = function() {
  return momentTimeZone.tz.names();
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));



//GET: /appointments/created
router.get('/create', function(req, res, next){
  res.render('appointment/create', {
    timeZones: getTimeZones(),
    appointment: new appointment({name: '', phone:'',timeZone:'',time: ''})
  });
});

// GET: /appointments/create
router.get('/create', function(req, res, next) {
  res.render('appointments/create', {
    timeZones: getTimeZones(),
    appointment: new Appointment({name: '',
                                  phoneNumber: '',
                                  notification: '',
                                  timeZone: '',
                                  time: ''})});
});

// POST: /appointments
router.post('/', function(req, res, next) {
  var name = req.body.name;
  var phoneNumber = req.body.phoneNumber;
  var notification = req.body.notification;
  var timeZone = req.body.timeZone;
  var time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  var appointment = new Appointment({name: name,
                                       phoneNumber: phoneNumber,
                                       notification: notification,
                                       timeZone: timeZone,
                                       time: time});
  appointment.save()
    .then(function() {
      res.redirect('/');
    });
});

// GET: /appointments/:id/edit
router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  Appointment.findOne({_id: id})
    .then(function(appointment) {
      res.render('appointment/edit', {timeZones: getTimeZones(),
                                       appointment: appointment});
    });
});

// POST: /appointments/:id/edit
router.post('/:id/edit', function(req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  var phoneNumber = req.body.phoneNumber;
  var notification = req.body.notification;
  var timeZone = req.body.timeZone;
  var time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  Appointment.findOne({_id: id})
    .then(function(appointment) {
      appointment.name = name;
      appointment.number = number;
      appointment.notification = notification;
      appointment.timeZone = timeZone;
      appointment.time = time;

      appointment.save()
        .then(function() {
          res.redirect('/');
        });
    });
});

// POST: /appointments/:id/delete
router.post('/:id/delete', function(req, res, next) {
  const id = req.params.id;

  Appointment.remove({_id: id})
    .then(function() {
      res.redirect('/');
    });
});



app.listen(process.env.PORT || 3000);
