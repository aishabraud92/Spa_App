require('dotenv').config();
var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();
var yelp = require('yelp-fusion');
var isLoggedIn = require('../middleware/loggedIn');
var client = yelp.client(process.env.API_KEY);

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

router.get('/schedule', function(req, res) {
    console.log('find rest');
    res.render('spa/schedule', {businesses: [null]});
  });


//yelp Results post
router.post('/results', function(req, res) {
    console.log(req.body);
    yelpSearch(req.body.spa, 'Seattle', function(businesses){
      res.render('spa/results', {businesses: businesses});
    });
});
router.get('/schedule', isLoggedIn, function(req, res) {
  res.render('spa/confirmed');
});
//post schedule after setup
router.post('/schedule', isLoggedIn, function(req, res){
  // res.send('working');
  // console.log(req.body);
  db.schedule.create({
    course: req.body.spa,
    date: req.body.date,
    time: req.body.time,
    userId: req.user.id
  }).then(function(createdSchedule){
    req.flash('success', 'Success!');
    res.redirect('/profile');
  }).catch(function(err){
    res.send (err.message)
  });
});


//delete id route
router.delete('/:id', function(req, res) {
  console.log('delete Route ID = ', req.params.id);
  db.schedule.findOne({
    where: {id: req.params.id}
  }).then(function(schedule){
    db.schedule.destroy({
      where:{
        id: req.params.id}
      }).then(function(deleted){
        console.log('deleted =', deleted);
        res.send('working');
      }).catch(function(err){
        console.log('error', err);
        res.send('fail', err);

    });
  });
});



module.exports = router;
