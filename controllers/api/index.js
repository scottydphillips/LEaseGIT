const router = require('express').Router();
const userRoutes = require('./userRoutes');
const ownerRoutes = require('./ownerRoute');

router.use('/user', userRoutes);
router.use('/owner', ownerRoutes);

module.exports = router;