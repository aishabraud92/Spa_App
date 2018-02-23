var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var flash = require('connect-flash');

router.get('/appointment', isLoggedIn, function(req, res) {
  res.render('spa/appointment');
});

router.post('/appointment', isLoggedIn, function(req, res){
  db.appointment.create({
    spa: req.body.spa,
    date: req.body.date,
    time: req.body.time,
    userId: req.user.id
  }).then(function(createdAppointment){
    res.redirect('/appointment/');
  }).catch(function(err){
    res.send (err.message)
  });
});
module.exports = router;
