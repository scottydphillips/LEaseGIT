const Users = require("./Users");
const Property = require("./Property");
const Contract = require("./Contract");

//User has many properties
Users.hasMany(Property, {
  
   
});

//Property belongs to one user
Property.belongsTo(Users, {
  
  
});

//Contract belongs to one property
Contract.belongsTo(Property,{


})

//Property has one contract 
Property.hasOne(Contract, {
  
  
});





module.exports = { Users, Property, Contract };
