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
    primaryKey:true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type:DataTypes.BOOLEAN,
    default:true,
  },
},
{
    sequelize,
    freezeTableName: true,
    timestamps:false,
    underscored: true,
    modelName: 'property',
  } 
);

module.exports = Property;