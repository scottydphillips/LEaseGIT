const sequelize = require("../config/connection");
const { User, Property, Contract } = require("../models");

const userData = require("../../seeds/userData");
const propertyData = require("../../seeds/propertyData");
const contractData = require("./contractData");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  

    await userData();
    console.log("\n----- USER DATA -----\n");

    await propertyData();
    console.log("\n----- PROPERTY DATA -----\n");

    await contractData();
    console.log("\n----- CONTRACT DATA -----\n");


    process.exit(0);


};

seedDatabase();