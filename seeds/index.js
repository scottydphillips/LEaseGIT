const sequelize = require("../config/connection");
const { Owner, Property, Tenant } = require("../models");

const ownerData = require("./ownerData");
const propertyData = require("./propertyData");
const tenantData = require("./tenantData");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await ownerData();
    console.log("\n----- OWNER DATA -----\n");

    await propertyData();
    console.log("\n----- PROPERTY DATA -----\n");

    await tenantData();
    console.log("\n----- TENANT DATA -----\n");


    process.exit(0);


};

seedDatabase();