const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Deck, Card, Attack } = require(".");
const {db} = require("../db/config");

// define in global scope
let user;
let deck;
let card;
let card2;
let attack;
let attack2;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  user = await User.create({ username: "Gandalf" });
  deck = await Deck.create({ name: "Starlight", xp: 12285 });
  card = await Card.create({ name: "Stardust Dragon", mojo: 8, stamina: 2000, imgUrl: 'https://static.wikia.nocookie.net/yugioh/images/0/0a/StardustDragon-DAMA-EN-StR-1E.png/revision/latest?cb=20230429203302' });
  card2 = await Card.create({ name: 'Shooting Quasar Dragon', mojo: 12, stamina: 4000, imgUrl: 'https://static.wikia.nocookie.net/yugioh/images/8/8b/ShootingQuasarDragon-LC05-EN-UR-LE.png/revision/latest/scale-to-width-down/300?cb=20141024163820' });
  attack = await Attack.create({ title: 'Supernova', mojoCost: 4, staminaCost: 1000 });
  attack2 = await Attack.create({ title: 'Ion beam', mojoCost: 1, staminaCost: 400 });
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
    await deck.setCards([card, card2]);
    const result = await Deck.findByPk(1, {include: Card});
    expect(result.cards.length).toBe(2);
  });

  it('Many Cards can have many Attacks', async () => {
    let cards = await Card.findByPk(2, {include: Attack});
    let attacks = await Attack.findByPk(2, {include: Card});
    expect(cards.Attacks[0].id).toBe(1);
    expect(attacks.Cards[0].id).toBe(3);
  });
});