const Users = require("./Users");
const Property = require("./Property");
const Contract = require("./Contract");

//User has many properties
Users.hasMany(Property, {
  
   
});

//Property belongs to one user
Property.belongsToOne(Users, {
  
  
});

//Contract belongs to one property
Contract.belongsToOne(Property,{


})

//Property has one contract 
Property.hasOne(Contract, {
  
  
});





module.exports = { Users, Property, Contract };
