const {db, DataTypes} = require ('../db/config.js')

const Card = db.define('Card', {
    name: {
        type: DataTypes.STRING,
    },
    mojo: {
        type: DataTypes.INTEGER,
    },
    stamina: {
        type: DataTypes.INTEGER,
    },
    imgUrl: {
        type: DataTypes.STRING,
    },
});
module.exports = {Card}