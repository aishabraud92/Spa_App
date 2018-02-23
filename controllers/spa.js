require('dotenv').config();
var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var yelp = require('yelp-fusion');
var client = yelp.client(process.env.API_KEY);

// yelp search
function yelpSearch(searchTerm, location, callback){
  client.search({
    term: searchTerm,
    location: location
  }).then(response => {
    response.jsonBody.businesses.forEach(function(item){

    });
    callback(response.jsonBody.businesses);
  }).catch(e => {
    console.log(e);
  });
}

router.get('/', function(req, res) {
  console.log();
  res.send('api page');
});

router.get('/appointment', function(req, res) {
  console.log('find rest route reach');
  res.render('spa/appointment', {businesses: [null]});
});
//yelp post route
router.post('/active', function(req, res) {
  console.log(req.body);
  yelpSearch(req.body.course, 'Seattle', function(businesses){
    res.render('spa/active', {businesses: businesses});
  });
});
router.get('/appointment', isLoggedIn, function(req, res) {
  res.render('spa/confirmed');
});
//post appointment after setup
router.post('/appointment', isLoggedIn, function(req, res){
  // res.send('working');
  // console.log(req.body);
  db.appointment.create({
    course: req.body.course,
    date: req.body.date,
    time: req.body.time,
    userId: req.user.id
  }).then(function(createdappointment){
    req.flash('success', 'Success');
    res.redirect('/profile');
  }).catch(function(err){
    res.send (err.message)
  });
});

//delete id route in profile
router.delete('/:id', function(req, res) {
  console.log('delete Route ID = ', req.params.id);
  db.appointment.findOne({
    where: {id: req.params.id}
  }).then(function(appointment){
    db.appointment.destroy({
      where:{
        id: req.params.id}
      }).then(function(deleted) {
        console.log('deleted = ', deleted);
        res.send('all good');
      }).catch(function(err) {
        console.log('error happend', err);
        res.send('failed', err);
      });
    });
  });

module.exports = router;
