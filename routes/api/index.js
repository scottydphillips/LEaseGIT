const router = require('express').Router();

const owner = require('./owner');
const property = require('./property');
const tenant = require('./tenant');

router.use('/owner', owner);
router.use('/property', property);
router.use('/tenant', tenant);

module.exports = router;
