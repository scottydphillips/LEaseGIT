const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
 

// create our Traveller model
class Contract extends Model {}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER
    },
    length: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "contract",
  }
);
        






module.exports = Contract;