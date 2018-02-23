require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var db = require('./models');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var passport = require('./config/passportConfig');
var session = require('express-session');
var request = require('request');
var app = express();



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

app.use('/auth', require('./controllers/auth'));

//appointments displays on profile
app.get('/profile', isLoggedIn, function(req,res){
  console.log(req.body);
  console.log(res.locals.currentUser.dataValues.id);

//db
db.appointment.findOne({
  // where: {name:res.locals.currentUser.dataValues.id}
  where: {name:'name'}
}).then(function(appointment){
  console.log('comment appointment', appointment);
  res.render('profile', {appointment: appointment});
}).catch(function(err){
  res.send(404, err)
});
});


app.get('/appointment', isLoggedIn, function(req,res){
  res.render('spa/appointment');
});

app.get('/yelp', isLoggedIn, function(req,res){
  res.render('spa/yelp')
});
//app.post('/yelp', isLoggedIn, function(req,res){
  //res.send('spa/yelp')
//});
app.get('/confirmed', isLoggedIn, function(req,res){
  res.render('spa/confirmed');
});
app.get('/search', isLoggedIn, function(req,res){
  res.render('spa/search');
});
//app.post('/search', isLoggedIn, function(req,res){
  //res.render('spa/search');
//});

app.use('/auth', require('./controllers/auth'));
app.use('/spa', require('./controllers/spa'));
//app.use('/appointment', require('./controllers/appointment'));



app.listen(process.env.PORT || 3000);
