const router = require('express').Router();
const{User} = require('../../models');

router.get('/',async (req,res)=>{

  res.json({message:req.body.email});
  // if(req.session.loggedIn){
  //   const userData = await User.findOne({ where: { email: 'jimmy@hotmail.com'} });
  //   if (userData.role === "owner") {
  //     res.redirect('/api/owner');
  //   }else{
  //     res.redirect('/api/tenant');
  //   }
  // }else{
  //   res.redirect('/login');
  // }
})

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const UserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(UserData);
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
        req.session.user_id = userData.id,
        req.session.loggedIn = true;
  
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