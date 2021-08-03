const { Model, DataTypes } = require("sequelize");
  const sequelize = require('../config/connection');
  
  class Furniture extends Model {}
  
  //Model to store furniture data used in Room
  Furniture.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      furniture_texture: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      x_position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      y_position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scale: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      // Reference to the room this furniture belongs to
      room_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'room',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'furniture'
    }
  );
  
  module.exports = Furniture;
  