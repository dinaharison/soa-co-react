/**
 * Sequelize is a popular Object Relational Mapping library
 * it helps to manipulate database easily
 * without the need of writting plain SQL requests
 */
const { Sequelize } = require("sequelize");

/**
 * Create a new Sequelize object to configure the database connection
 * if the database doesn't exist, Sequelize will create it for you
 * otherwise, it will use the existing database
 * "user" refers to the database name,
 * "dbusername" and "dbpassword" refers to your actual database credentials
 */
const sequelize = new Sequelize("user", "dbusername", "dbpassword", {
  dialect: "sqlite",
  host: "./database.sqlite",
});

module.exports = sequelize;
