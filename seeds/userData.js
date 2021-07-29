const { User } = require('../models');

const userData = [
  {
    name: "Jimmy",
    role: "owner",
    email: "jimmy@hotmail.com",
    password: "Password123!",
    phone: "111.111.1111",
  },
  {
    name: "Matilda",
    role: "tenant",
    email: "Matilda@hotmail.com",
    password: "Password123!",
    phone: "222.222.2222",
  },
  {
    name: "Scott",
    role: "tenant",
    email: "Scott@hotmail.com",
    password: "Password123!",
    phone: "333.333.3333",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;