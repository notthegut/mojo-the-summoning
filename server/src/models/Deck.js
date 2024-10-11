const {db,DataTypes} = require('../db/config.js')

const Deck = db.define('deck', {
    name: {
        type: DataTypes.STRING,
    },
    xp: {
        type: DataTypes.INTEGER
    },
});
module.exports = {Deck}