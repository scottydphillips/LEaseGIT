const sequelize = require("../config/connection");
const { Users, Property, Contract } = require("../models");

const userData = require("../../seeds/userData");
const propertyData = require("../../seeds/propertyData");
const contractData = require("./contractData");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
    console.log("\n----- DATABASE SYNCED -----\n");

    await userData();
    console.log("\n----- OWNER DATA -----\n");

    await propertyData();
    console.log("\n----- PROPERTY DATA -----\n");

    await contractData();
    console.log("\n----- TENANT DATA -----\n");


    process.exit(0);


};

seedDatabase();