//requires for sequelize and Models
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Store extends Model {}

// Store model/properties creation with sequelize including id/title/body/user_id 
Store.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    imgName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'store',
  },
);

//export Store model
module.exports = Store;