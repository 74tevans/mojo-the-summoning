const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Deck } = require(".");
const {db} = require("../db/config");

// define in global scope
let deck;

// clear db and create new deck before tests
beforeAll(async () => {
  await db.sync({ force: true });
  deck = await Deck.create({ name: "Starlight", xp: 12285 });
});

// clear db after tests
afterAll(async () => await db.close());

describe("Deck", () => {
  it("has an id", async () => {
    expect(deck).toHaveProperty("id");
  });

  it("has a name", async () => {
    expect(deck).toHaveProperty("name");
  });

  it('has name Starlight', async () => {
    expect(deck.name).toBe('Starlight')
  });

  it('has xp', async () => {
    expect(deck).toHaveProperty('xp')
  });

  it('has an xp of 12285', async () => {
    expect(deck.xp).toBe(12285)
  });
});