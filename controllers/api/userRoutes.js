const router = require('express').Router();
const{User} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',async(req,res)=>{
  try {
    const userData = await User.findOne({where:{email:req.session.email},raw:true})
    res.render('profile',userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// CREATE new user
router.post('/register', async (req, res) => {
    try {
      const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone:req.body.phone,
        role: req.body.role
      });

      //initialize user_id in session
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.email = req.body.email;
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/login', async (req, res) => {
    try {
      // Find the user who matches the posted e-mail address
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      // Verify the posted password with the password store in the database
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      // Create session variables based on the logged in user
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.email = req.body.email;
        res
          .status(200)
          .json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  });

  // Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;