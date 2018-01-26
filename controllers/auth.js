var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.get('/login', function(req, res){
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  successFlash: 'Logged In!',
  falureRedirect: '/auth/login',
  failureFlash: 'Failed!'
}));

router.get('/signup', function(req, res){
  res.render('auth/signup');
});

router.post('/signup', function(req, res, next){
  console.log('req.body is', req.body);

  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstname: req.body.name,
      lastname: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, wasCreated){
    if(wasCreated){
      //successful login
      passport.authenticate('local', {
        successRedirect: '/profile',
        successFlash: 'Successfully logged in',
        failureRedirect: '/auth/signup',
        failureFlash: 'Failed to sign up!'
      })(req, res, next);
    }
    else {
      //error login
      req.flash('error', 'Email already exists');
      res.redirect('/auth/login');
    }

  }).catch(function(err) {
    req.flash('error', err.message);
    res.redirect('/auth/signup');
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Successfully logged out');
  res.redirect('/');
});

module.exports = router;
var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.get('/login', function(req, res){
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  successFlash: 'Logged In!',
  falureRedirect: '/auth/login',
  failureFlash: 'Failed!'
}));
router.get('/signup', function(req, res){
  res.render('auth/signup');
});
router.post('/signup', function(req, res, next){
  console.log('req.body is', req.body);
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }

  }).spread(function(user, wasCreated){
    if(wasCreated){
     passport.authenticate('local', {
        successRedirect: '/profile',
        successFlash: 'Successfully logged in'
      })(req, res, next);
    }
    else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/login');
    }
  }).catch(function(err) {
    req.flash('error', err.message);
    res.redirect('/auth/signup');
  });
});
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Successfully logged out');
  res.redirect('/');
});

module.exports = router;
