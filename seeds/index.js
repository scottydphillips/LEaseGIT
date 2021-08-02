const sequelize = require("../config/connection");
const {User,Property} = require("../models");
const userData = require("../seeds/userData");
const propertyData = require("../seeds/propertyData");
// const seedContract = require("../seeds/contractData");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData,{
        individualHooks: true,
        returning: true,
    });
    console.log("\n----- USER DATA -----\n");


    await Property.bulkCreate(propertyData);
    console.log("\n----- PROPERTY DATA -----\n");

    process.exit(0);
  };
 
seedDatabase();