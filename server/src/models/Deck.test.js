// src/models/Deck.test.js
const { db } = require("../db/config.js");
const {Deck} = require("./Deck");

let deck; // Variable to hold deck instance

// Clear db and create new deck before tests
beforeAll(async () => {
    await db.sync({ force: true }); // Sync the database
    deck = await Deck.create({ name: 'Starter Deck', xp: 100 }); // Create a test deck
});

// Clear db after tests
afterAll(async () => {
    await db.close(); // Close the database connection
});

// Example tests
describe('Deck', () => {
    it('has an id', async () => {
        expect(deck.id).toBeDefined(); // Test if id is defined
    });

    it('has a name', async () => {
        expect(deck.name).toEqual('Starter Deck'); // Test if name is correctly assigned
    });

    it('has xp', async () => {
        expect(deck.xp).toEqual(100); // Test if xp is correctly assigned
    });
});
