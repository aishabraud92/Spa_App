require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/loggedin');
var passport = require('./config/passportConfig');
var session = require('express-session');
var db = require("./models");
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
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

app.get('/', function(req,res) {
  res.render('./welcome/home');
});

app.get('/profile', isLoggedIn, function(req,res) {
  console.log(req.body);
  db.appointment.findAll().then(function(appointments){
    res.render('profile.ejs', {appointments: appointments });
  }).catch(function(err){
    res.send(404, err);
  });
});

app.get('/', isLoggedIn, function(req,res) {
  res.render('welcome/home');
});

app.get('/schedule', isLoggedIn, function(req,res) {
  res.render('spas/schedule');
});

app.get('/search', isLoggedIn, function(req, res) {
  res.send("spas/search");
});

app.post('/schedule', isLoggedIn, function(req,res) {
  db.appointment.create ({
    name: req.body.service,
    nextnotice: req.body.date + " " + req.body.time,
    userId: req.user.id
  }).then(function(appointments) {
    res.redirect ("/profile");
  }).catch(function(err) {
    console.log("database error", err);
  });
});

app.use('/auth', require('./controllers/auth'));
app.use('/appointments', require('./controllers/appointments'));

var server = app.listen(process.env.PORT || 3000);

module.export = server;
