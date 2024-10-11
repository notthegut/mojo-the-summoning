const { User } = require('./User')
const { Deck } = require('./Deck')
const { Card } = require('./Card')
const { Attack } = require('./Attack')
// import the rest of your models above

// set up the associations here
Deck.belongsTo(User);
User.hasOne(Deck);

Card.belongsTo(Deck)



// and then export them all below
module.exports = { User }
module.exports = { Deck }
module.exports = { Card }
module.exports = { Attack }
