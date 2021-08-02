const router = require('express').Router();
const { User, Property } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  //if logged in, show the listings of all properties
  try {
    //get all properties from DB as raw data objects
    // const propertyData = await Property.findAll();
    // console.log(propertyData);

    // const listings = await propertyData.map((property)=>{
    //   property.get({plain : true});
    // });
    // console.log(listings);

    const listings = await Property.findAll({raw:true});
    
    //render the page with all listings
    res.render('homepage',{
      listings,
      loggedIn:req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
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
  res.render('login');
});

module.exports = router;