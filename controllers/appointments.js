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

  //delete route
  router.delete('/:id', function(req, res) {
        db.appointments.destroy({
          where:{
            id: req.params.id}
          }).then(function(deleted) {
            console.log('deleted = ', deleted);
            res.send('all good');
      }).catch(function(err) {
            console.log('error', err);
            res.send('failed', err);
      });
  });

//yelp Result post
router.post('/search', function(req, res) {
    console.log(req.body);
    yelpSearch(req.body.appointments, 'Seattle', function(businesses){
      res.render('spa/search', {businesses: businesses});
    });
});



module.exports = router;
