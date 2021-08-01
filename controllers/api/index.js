const router = require('express').Router();
const userRoutes = require('./userRoutes');
const ownerRoutes = require('./ownerRoute');
const listingRoutes = require('./listingRoute');

router.use('/user', userRoutes);
router.use('/owner', ownerRoutes);
router.use('/listing', listingRoutes);

module.exports = router;