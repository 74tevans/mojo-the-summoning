const {db, DataTypes} = require('../db/config.js');

let Deck = db.define('Deck', {
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER
});

module.exports = {Deck};