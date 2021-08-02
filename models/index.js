const User = require("./User");
const Property = require("./Property");
const Furniture = require("./Furniture");
// const Contract = require("./Contract");

// //User has many properties
// User.hasMany(Property, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE'
// });
  
   

// //Property belongs to one user
// Property.belongsTo(User, {
//   foreignKey: "userId",
//   onDelete: "CASCADE",
// });


// //Property has one contract
// Property.hasOne(Contract, {
//   foreignKey: "propertyId",
//   onDelete: "CASCADE",
// });

// Room.belongsTo(Property, {
//     foreignKey: 'property_id',
//     onDelete: "CASCADE",
//   });

// Furniture.belongsTo(Room, {
//     foreignKey: 'property_id',
//     onDelete: "CASCADE",
//   });

module.exports = { User, Property};
