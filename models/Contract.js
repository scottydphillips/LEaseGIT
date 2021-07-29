const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
 

// create our Traveller model
class Contract extends Model {}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
    },
    length: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "contract",
  }
);
        






module.exports = Contract;