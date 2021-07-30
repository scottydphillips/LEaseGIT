const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    username: "Jimmy",
    role: "owner",
    email: "jimmy@hotmail.com",
    password: "Password123!",
    phone: "111.111.1111",
  },
  {
    username: "Matilda",
    role: "tenant",
    email: "Matilda@hotmail.com",
    password: "Password123!",
    phone: "222.222.2222",
  },
  {
    username: "Scott",
    role: "tenant",
    email: "Scott@hotmail.com",
    password: "Password123!",
    phone: "333.333.3333",
  },
];

const seedUser = async () =>{
  await sequelize.sync({force:true});

  const users = await User.bulkCreate(userData,{
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
}

module.exports = seedUser;