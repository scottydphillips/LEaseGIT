const User = require("./User");
const Property = require("./Property");
const Furniture = require("./Furniture");
// const Contract = require("./Contract");

// Property.belongsTo(User,{
//     foreignKey:'owner_id'
// });

// User.hasOne(Property,{
//     foreignKey:'owner_id',
//     onDelete:'CASCADE',
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
