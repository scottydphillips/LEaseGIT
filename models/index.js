const Users = require("./Users");
const Property = require("./Property");
const Contract = require("./Contract");

//User has many properties
Users.hasMany(Property, {
    foreignKey: 'users_id',
     onDelete: 'CASCADE'
});

//Property belongs to one user
Property.belongsTo(Users, {
    foreignKey:'users_id', 
    onDelete: 'CASCADE'
});
  


//Property has one contract 
Property.hasOne(Contract, {
  foreignKey: "property_id",
   onDelete: "CASCADE",
});





module.exports = { Users, Property, Contract };
