// src/models/Card.test.js
const { db } = require("../db/config.js");
const {Card} = require("./Card");

let card; // Variable to hold card instance

// Clear db and create new card before tests
beforeAll(async () => {
    await db.sync({ force: true }); // Sync the database
    card = await Card.create({ 
        name: 'Fire Mage', 
        mojo: 50, 
        stamina: 80, 
        imgUrl: 'http://example.com/fire-mage.png' 
    }); // Create a test card
});

// Clear db after tests
afterAll(async () => {
    await db.close(); // Close the database connection
});

// Test suite for Card model
describe('Card', () => {
    it('should have an id', async () => {
        expect(card.id).toBeDefined(); // Test if id is defined
    });

    it('should have a name', async () => {
        expect(card.name).toEqual('Fire Mage'); // Test if name is correctly assigned
    });

    it('should have mojo', async () => {
        expect(card.mojo).toEqual(50); // Test if mojo is correctly assigned
    });

    it('should have stamina', async () => {
        expect(card.stamina).toEqual(80); // Test if stamina is correctly assigned
    });

    it('should have an imgUrl', async () => {
        expect(card.imgUrl).toEqual('http://example.com/fire-mage.png'); // Test if imgUrl is correctly assigned
    });
});
