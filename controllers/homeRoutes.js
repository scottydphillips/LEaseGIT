const router = require('express').Router();
const { User, Property } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  //if logged in, show the listings of all properties
  try {
    //get all properties from DB
    const propertyData = await Property.findAll();
    //send to handlebars for #each function to process all the cards
    const listings = propertyData.map(property => {
      property.get({plain:true});
    });
    //render the page with all listings
    res.render('homepage',{
      listings,
      loggedIn:req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//when /login is requested, render the login page
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //else, render the login page
  res.render('homepage');
});

module.exports = router;