const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Attack } = require(".");
const {db} = require("../db/config");

// define in global scope
let attack;

// clear db and create new attack before tests
beforeAll(async () => {
  await db.sync({ force: true });
  attack = await Attack.create({ title: 'Supernova', mojoCost: 4, staminaCost: 1000 });
});

// clear db after tests
afterAll(async () => await db.close());

describe("Attack", () => {
  it("has an id", async () => {
    expect(attack).toHaveProperty("id");
  });

  it("has a title", async () => {
    expect(attack).toHaveProperty("title");
  });

  it('has title Supernova', async () => {
    expect(attack.title).toBe('Supernova')
  });

  it('has a mojoCost', async () => {
    expect(attack).toHaveProperty('mojoCost')
  });

  it('has a mojoCost of 4', async () => {
    expect(attack.mojoCost).toBe(4)
  });

  it('has a staminaCost', async () => {
    expect(attack).toHaveProperty('staminaCost')
  });

  it('has a staminaCost of 1000', async () => {
    expect(attack.staminaCost).toBe(1000)
  });
});