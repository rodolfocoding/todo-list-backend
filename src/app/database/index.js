const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../model/User");

const connection = new Sequelize(dbConfig);

User.init(connection);

User.associate(connection.models);

module.exports = connection;
