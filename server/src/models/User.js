const { db, DataTypes } = require("../db/config"); 

// Create the User model
const User = db.define('User', { // Use 'User' for case sensitivity
    username: {
        type: DataTypes.STRING,
        allowNull: false // Ensures username cannot be null
    }
});

// Export the User model
module.exports = {User}; // Export the model
