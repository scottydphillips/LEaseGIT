const router = require('express').Router();
const userRoutes = require('./userRoutes');
const ownerRoutes = require('./ownerRoute');
const tenantRoutes = require('./tenantRoute');

router.use('/user', userRoutes);
router.use('/owner', ownerRoutes);
router.use('/tenant',tenantRoutes);

module.exports = router;