const sequelize = require("../config/connection");

const seedUser = require("../seeds/userData");
const seedProperty = require("../seeds/propertyData");
// const seedContract = require("../seeds/contractData");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await seedUser();
    console.log("\n----- USER DATA -----\n");

    await seedProperty();
    console.log("\n----- PROPERTY DATA -----\n");

    // await seedContract();
    // console.log("\n----- CONTRACT DATA -----\n");


    process.exit(0);
  };
  

seedDatabase();