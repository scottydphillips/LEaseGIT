const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Traveller model
class Property extends Model {}

Property.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type:DataTypes.BOOLEAN,
    default:true,
  },
  property_id: {
    type: DataTypes.INTEGER,
  }
},

{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'property',
  } 

  
);

module.exports = Property;