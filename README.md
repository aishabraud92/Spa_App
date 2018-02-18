
# appointments_App
# Objectives
* Create Fullstack app that allows user to set and get updates on appontments
* Give user the ability to cancel(delete) appointments.
* User has personal profile that updates current appointments
* User has ability to search any spa in their current city (Seattle)

# Technologies used
* NodeJs
* Sequelize
* HTML/CSS(Boostrap FRMK)
* TRELLO
* Postgres
* Yelp API (Fusion)

# User Stories
* Client 1 wants to be able to log on to her account and see existing appointment(s)
* Client 2 needs a quick update or reminder of current appointments and also the ability to cancel(delete) any
* Client 3 wants to be able to search for any spa/salons in her current area (Seattle)

# Steps (no specific order)
* Incorporate buisness API (Google places or Yelp)
* Run Migrations
* Using Express-Authentication boilerplate
* Stub out GET, POST, DELETE, PUT routes then fill them out accordingly

```
router.get('/schedule', function(req, res) {
    console.log('find rest');
    res.render('appointment/schedule', {businesses: [null]});
  });

```
* Debugging
* Deploy project on Heroku
* Use Trello to keep track of progress
[![Screen_Shot_2018-01-18_at_1.17.44_PM.png](https://s10.postimg.org/ajg14hheh/Screen_Shot_2018-01-18_at_1.17.44_PM.png)](https://postimg.org/image/eskr6nknp/)
[![Screen_Shot_2018-01-18_at_1.18.03_PM.png](https://s10.postimg.org/f5c5cvd89/Screen_Shot_2018-01-18_at_1.18.03_PM.png)](https://postimg.org/image/4v9qdmncl/)
[![Screen_Shot_2018-01-18_at_1.18.17_PM.png](https://s10.postimg.org/6zu3eqza1/Screen_Shot_2018-01-18_at_1.18.17_PM.png)](https://postimg.org/image/f5c5cwnit/)


# Heroku Live Link




>>>>>>> 6598f5d2fddd835250e1dc6c34156570212d44a7
