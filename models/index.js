const User = require("./User");
const Property = require("./Property");
const Contract = require("./Contract");

//User has many properties
User.hasMany(Property, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  
   
});

//Property belongs to one user
Property.belongsTo(User, {
  
  
});

//Contract belongs to one property
Contract.belongsTo(Property,{


})

//Property has one contract 
//Property.hasOne(Contract, {
  
  
//});





module.exports = { User, Property, Contract };
