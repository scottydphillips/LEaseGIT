const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Traveller model
class Contract extends Model {}

Contract.init(
    {
        id:{
        type:DataTypes.INTEGER,
        },
        length:{
        type:DataTypes.STRING,
        }

    }
)
        






module.exports = Contract;