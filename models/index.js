const User = require("./User");
const Property = require("./Property");
const Contract = require("./Contract");

//User has many properties
Users.hasMany(Property, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  
   
});

//Property belongs to one user
Property.belongsToOne(Users, {
  foreignKey:'userId',
  onDelete: 'CASCADE'
  
});

//Contract belongs to one property
Contract.belongsToOne(Property, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});

//Property has one contract 
//Property.hasOne(Contract, {
  
  
//});





module.exports = { User, Property, Contract };
