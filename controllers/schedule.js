var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var flash = require('connect-flash');

router.get('/schedule', isLoggedIn, function(req, res) {
  res.render('spa/schedule');
});

router.post('/schedule', isLoggedIn, function(req, res){
  // res.send('working');
  // console.log(req.body);
  db.schedule.create({
    spa: req.body.spa,
    date: req.body.date,
    time: req.body.time,
    userId: req.user.id
  }).then(function(createdSchedule){
    res.redirect('/schedule/');
  }).catch(function(err){
    res.send (err.message)
  });
});
module.exports = router;
