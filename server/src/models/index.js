const { User } = require('./User');
const { Deck } = require('./Deck');
const { Card } = require('./Card');
const { Attack } = require('./Attack');

// Set up associations
Deck.belongsTo(User);
User.hasOne(Deck);

Deck.hasMany(Card);
Card.belongsTo(Deck);

Card.belongsToMany(Attack, { through: 'CardAttacks' });
Attack.belongsToMany(Card, { through: 'CardAttacks' });

// Export models
module.exports = { User, Deck, Card, Attack };
