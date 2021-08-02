const User = require("./User");
const Property = require("./Property");


// Property.belongsTo(User,{
//     foreignKey:'owner_id'
// });

// User.hasMany(Property,{
//     foreignKey:'owner_id',
//     onDelete:'CASCADE',
// });

module.exports = { User, Property};
