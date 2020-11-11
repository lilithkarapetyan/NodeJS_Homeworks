require('dotenv').config();
const { Sequelize } = require('sequelize');

const {user, username, password, dbURL } = process.env;

const sequelize = new Sequelize(user, username, password, {
    host: dbURL,
    dialect: "mysql",
    dialectOptions: {
        multipleStatements: true,
    },
});

module.exports = sequelize;
