const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
 

// create our Traveller model
class Contract extends Model {}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER
    },
    term: {
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "contract",
  }
);
        






module.exports = Contract;