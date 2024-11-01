const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Card } = require(".");
const {db} = require("../db/config");

// define in global scope
let card;

// clear db and create new card before tests
beforeAll(async () => {
  await db.sync({ force: true });
  card = await Card.create({ name: "Stardust Dragon", mojo: 8, stamina: 2000, imgUrl: 'https://static.wikia.nocookie.net/yugioh/images/0/0a/StardustDragon-DAMA-EN-StR-1E.png/revision/latest?cb=20230429203302' });
});

// clear db after tests
afterAll(async () => await db.close());

describe("Card", () => {
  it("has an id", async () => {
    expect(card).toHaveProperty("id");
  });

  it("has a name", async () => {
    expect(card).toHaveProperty("name");
  });

  it('has name Stardust Dragon', async () => {
    expect(card.name).toBe('Stardust Dragon')
  });

  it('has a mojo', async () => {
    expect(card).toHaveProperty('mojo')
  });

  it('has a mojo of 8', async () => {
    expect(card.mojo).toBe(8)
  });

  it('has a stamina', async () => {
    expect(card).toHaveProperty('stamina')
  });

  it('has a stamina of 2000', async () => {
    expect(card.stamina).toBe(2000)
  });

  it('has an imgUrl', async () => {
    expect(card).toHaveProperty('imgUrl')
  });

  it('has the correct image URL', async () => {
    expect(card.imgUrl).toBe('https://static.wikia.nocookie.net/yugioh/images/0/0a/StardustDragon-DAMA-EN-StR-1E.png/revision/latest?cb=20230429203302')
  });
});