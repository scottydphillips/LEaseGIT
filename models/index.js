const User = require("./User");
const Property = require("./Property");
// const Contract = require("./Contract");

// Property.belongsTo(User,{
//     foreignKey:'owner_id'
// });

// User.hasOne(Property,{
//     foreignKey:'owner_id',
//     onDelete:'CASCADE',
// });

module.exports = { User, Property};
