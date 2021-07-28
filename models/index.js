const Owner = require("./Owner");
const Property = require("./Property");
const Tenant = require("./Tenant");

//Owner has many properties
Owner.hasMany(Property, {
  foreignKey: "owner_id",
   
});

//Tenant belongs to one property
Tenant.belongsToMany(Property, {
  foreignKey: "tenant_id",
  
});

//Property has many tenants
Property.hasMany(Tenant, {
  foreignKey: "property_id",
  
});

//Property belongs to owner

Property.belongsTo(Owner, {
  foreignKey: "Owner_id",
  onDelete: "CASCADE",

});

module.exports = { Owner, Property, Tenant };
