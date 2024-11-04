const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Deck, Card, Attack } = require(".");
const {db} = require("../db/config");

// define in global scope
let user;
let deck;
let card;
let attack;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  user = await User.create({ username: "Gandalf" });
  deck = await Deck.create({ name: "Starlight", xp: 12285 });
  card = await Card.create({ name: "Stardust Dragon", mojo: 8, stamina: 2000, imgUrl: 'https://static.wikia.nocookie.net/yugioh/images/0/0a/StardustDragon-DAMA-EN-StR-1E.png/revision/latest?cb=20230429203302' });
  attack = await Attack.create({ title: 'Supernova', mojoCost: 4, staminaCost: 1000 });
});

// clear db after tests
afterAll(async () => await db.close());

describe("Associations:", () => {

  it('User can only have one Deck', async () => {
    expect(typeof user.getDeck).toBe('function');
    expect(user.getDecks).toBeUndefined();
  });

  it('Deck can only belong to one User', async () => {
    expect(typeof deck.getUser).toBe('function');
    expect(deck.getUsers).toBeUndefined();
  });

  it('Deck can have many Cards', async () => {
    expect(typeof deck.getCards).toBe('function');
    expect(card.getDecks).toBeUndefined();
  });

  it('Many Cards can have many Attacks', async () => {
    expect(typeof card.getAttacks).toBe('function');
    expect(typeof attack.getCards).toBe('function');
  });
});