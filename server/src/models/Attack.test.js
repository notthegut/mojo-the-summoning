// src/models/Attack.test.js
const { db } = require("../db/config.js");
const {Attack} = require("./Attack");

let attack; // Variable to hold attack instance

// Clear db and create new attack before tests
beforeAll(async () => {
    await db.sync({ force: true }); // Sync the database
    attack = await Attack.create({ 
        title: 'Fireball', 
        mojoCost: 30, 
        staminaCost: 10 
    }); // Create a test attack
});

// Clear db after tests
afterAll(async () => {
    await db.close(); // Close the database connection
});

// Test suite for Attack model
describe('Attack', () => {
    it('should have an id', async () => {
        expect(attack.id).toBeDefined(); // Test if id is defined
    });

    it('should have a title', async () => {
        expect(attack.title).toEqual('Fireball'); // Test if title is correctly assigned
    });

    it('should have a mojo cost', async () => {
        expect(attack.mojoCost).toEqual(30); // Test if mojoCost is correctly assigned
    });

    it('should have a stamina cost', async () => {
        expect(attack.staminaCost).toEqual(10); // Test if staminaCost is correctly assigned
    });
});
