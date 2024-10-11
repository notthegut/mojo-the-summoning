const {db, DataTypes} = require ('../db/config.js')

const Attack = db.define('attack', {
    title: {
        type: DataTypes.STRING
    },
    mojoCost: {
        type: DataTypes.INTEGER
    },
    staminaCost: {
        type: DataTypes.INTEGER
    },
});
module.exports = {Attack}