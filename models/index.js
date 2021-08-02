const User = require("./User");
const Property = require("./Property");
const Furniture = require("./Furniture");
// const Contract = require("./Contract");

// Property.belongsTo(User,{
//     foreignKey:'owner_id'
// });

// //Property can have multiple rooms
// Property.hasMany(Room, {
//     foreignKey: "property_id",
//     onDelete: "CASCADE",
// });

// //Room belongs to a property
// Room.belongsTo(Property, {
//     foreignKey: 'property_id',
//     onDelete: "CASCADE",
// });

// //Room can have multiple furniture
// Room.hasMany(Furniture, {
//   foreignKey: "furniture_id",
//   onDelete: "CASCADE",

// User.hasOne(Property,{
//     foreignKey:'owner_id',
//     onDelete:'CASCADE',
// });

// //Furniture belongs to a room
// Furniture.belongsTo(Room, {
//     foreignKey: 'property_id',
//     onDelete: "CASCADE",
//   });


module.exports = { User, Property};
