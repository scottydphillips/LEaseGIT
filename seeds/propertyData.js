const{Property} = require('../models');

const propertyData = [
  { 
     
      address: "123 Alpharetta",
      availability: true,
      Property_id:"4"

    
  },

];

const seedProperty = () => Property.bulkCreate(propertyData);

module.exports = seedProperty;