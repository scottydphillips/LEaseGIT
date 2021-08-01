const sequelize = require('../config/connection');
const{ Property } = require('../models');

const propertyData = [
  { 
      address: "123 Alpharetta",
      availability: true,
  },
  { 
    address: "111 Alpharetta",
    availability: true,
  },
  { 
    address: "222 Atlanta",
    availability: false,
  },
];

  const seedProperty = async () =>{
  await sequelize.sync({force:true});
  const properties = await Property.bulkCreate(propertyData,{
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
};

module.exports = seedProperty;