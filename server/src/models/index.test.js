const{db} = require("../db/config");
const {User, Deck, Card, Attack } = require('./index'); // Adjust path as needed

let user, deck, card1, card2, attack1, attack2;

beforeAll(async () => {
    await db.sync({ force: true }); // Sync the database

    // Create a User and their Deck
    user = await User.create({ username: 'gandalf' });
    deck = await Deck.create({ name: 'Magic Deck', xp: 0 });
    await user.setDeck(deck); // Associate user with deck

    // Create Cards
    card1 = await Card.create({ name: 'Fireball', mojo: 10, stamina: 5 });
    card2 = await Card.create({ name: 'Lightning Strike', mojo: 8, stamina: 4 });
    await deck.addCards([card1, card2]); // Associate cards with deck

    // Create Attacks
    attack1 = await Attack.create({ title: 'Flame Strike', mojoCost: 5, staminaCost: 3 });
    attack2 = await Attack.create({ title: 'Thunderbolt', mojoCost: 4, staminaCost: 2 });
    await card1.addAttacks([attack1, attack2]); // Associate attacks with card1
    await card2.addAttacks([attack1]); // Associate attack1 with card2
});

afterAll(async () => {
    await db.close(); // Close the database connection
});

describe('Relationships between User, Deck, Card, and Attack', () => {
    test('User has exactly one Deck', async () => {
        const foundUser = await User.findOne({ where: { id: user.id }, include: Deck });
        expect(foundUser).toBeDefined(); // Check if user is found
        expect(foundUser.Deck).toBeDefined(); // Check if user has a deck
        expect(foundUser.Deck.name).toEqual(deck.name); // Check if the deck name is correct
    });

    test('Deck can have multiple Cards', async () => {
        const foundDeck = await Deck.findOne({ where: { id: deck.id }, include: Card });
        expect(foundDeck).toBeDefined(); // Check if deck is found
        expect(foundDeck.Cards.length).toBe(2); // Ensure deck has two cards
        expect(foundDeck.Cards.map(card => card.name)).toEqual(expect.arrayContaining([card1.name, card2.name])); // Verify card names
    });

    test('Card can have multiple Attacks', async () => {
        const foundCard1 = await Card.findOne({ where: { id: card1.id }, include: Attack });
        const foundCard2 = await Card.findOne({ where: { id: card2.id }, include: Attack });
        
        expect(foundCard1).toBeDefined(); // Check if card1 is found
        expect(foundCard1.Attacks.length).toBe(2); // Ensure card1 has two attacks
        expect(foundCard1.Attacks.map(attack => attack.title)).toEqual(expect.arrayContaining([attack1.title, attack2.title])); // Verify attack titles
        
        expect(foundCard2).toBeDefined(); // Check if card2 is found
        expect(foundCard2.Attacks.length).toBe(1); // Ensure card2 has one attack
        expect(foundCard2.Attacks[0].title).toEqual(attack1.title); // Verify the attack title
    });
});


// const { db } = require("../db/config.js"); This is wrong compare to the correct version above
// const {User} = require("./User");
// const {Deck} = require("./Deck");
// const {Card} = require("./Card");
// const {Attack} = require("./Attack");

// let user, deck, card1, card2, attack1, attack2; // Variables to hold instances

// beforeAll(async () => {
//     await db.sync({ force: true }); // Sync the database

//     // Create a User and their Deck
//     user = await User.create({ username: 'gandalf' });
//     deck = await Deck.create({ name: 'Magic Deck', xp: 0 });
//     await user.setDeck(deck); // Associate user with deck

//     // Create Cards
//     card1 = await Card.create({ name: 'Fireball', mojo: 10, stamina: 5 });
//     card2 = await Card.create({ name: 'Lightning Strike', mojo: 8, stamina: 4 });
//     await deck.addCards([card1, card2]); // Associate cards with deck

//     // Create Attacks
//     attack1 = await Attack.create({ title: 'Flame Strike', mojoCost: 5, staminaCost: 3 });
//     attack2 = await Attack.create({ title: 'Thunderbolt', mojoCost: 4, staminaCost: 2 });
//     await card1.addAttacks([attack1, attack2]); // Associate attacks with card1
//     await card2.addAttacks([attack1]); // Associate attack1 with card2
// });

// afterAll(async () => {
//     await db.close(); // Close the database connection
// });

// describe('Relationships between User, Deck, Card, and Attack', () => {
//     test('User has exactly one Deck', async () => {
//         const foundUser = await User.findOne({ where: { id: user.id }, include: Deck });
//         expect(foundUser).toBeDefined(); // Check if user is found
//         expect(foundUser.Deck).toBeDefined(); // Check if user has a deck
//         expect(foundUser.Deck.name).toEqual(deck.name); // Check if the deck name is correct
//     });

//     test('Deck can have multiple Cards', async () => {
//         const foundDeck = await Deck.findOne({ where: { id: deck.id }, include: Card });
//         expect(foundDeck).toBeDefined(); // Check if deck is found
//         expect(foundDeck.Cards.length).toBeGreaterThan(1); // Ensure deck has multiple cards
//         expect(foundDeck.Cards.map(card => card.name)).toEqual(expect.arrayContaining([card1.name, card2.name])); // Verify card names
//     });

//     test('Card can have multiple Attacks', async () => {
//         const foundCard1 = await Card.findOne({ where: { id: card1.id }, include: Attack });
//         const foundCard2 = await Card.findOne({ where: { id: card2.id }, include: Attack });
        
//         expect(foundCard1).toBeDefined(); // Check if card1 is found
//         expect(foundCard1.Attacks.length).toBeGreaterThan(1); // Ensure card1 has multiple attacks
//         expect(foundCard1.Attacks.map(attack => attack.title)).toEqual(expect.arrayContaining([attack1.title, attack2.title])); // Verify attack titles
        
//         expect(foundCard2).toBeDefined(); // Check if card2 is found
//         expect(foundCard2.Attacks.length).toBe(1); // Ensure card2 has one attack
//         expect(foundCard2.Attacks[0].title).toEqual(attack1.title); // Verify the attack title
//     });
// });
