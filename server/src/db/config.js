const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'), // Make sure this file is created
});

// Export the connection and DataTypes
module.exports = { db, DataTypes }; // Ensure it's exporting correctly

