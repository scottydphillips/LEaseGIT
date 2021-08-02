const {Contract} = require('../models');

const contractData = [  
    {
        id:'4',
        term:5
    }
]

const seedContract = () => Contract.bulkCreate(contractData);

module.exports = seedContract;
