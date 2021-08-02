const { Model, DataTypes } = require("sequelize");
  const sequelize = require('../config/connection');
  
  class Room extends Model {}
  
  Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      floor_texture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Reference to the property this room belongs to
      property_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'property',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'room'
    }
  );
  
  module.exports = Room;
  