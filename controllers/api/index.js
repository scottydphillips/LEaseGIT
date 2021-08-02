const router = require('express').Router();
const userRoutes = require('./userRoutes');
const propertyRoutes = require('./propertyRoutes');

router.use('/user', userRoutes);
router.use('/property',propertyRoutes);

module.exports = router;