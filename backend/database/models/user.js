const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config");

/**
 * The class is used to define database tables
 * column properties are defined as an object
 */
class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;
