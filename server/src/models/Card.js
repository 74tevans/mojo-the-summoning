const {db, DataTypes} = require('../db/config.js');

let Card = db.define('Card', {
    name: DataTypes.STRING,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
});

module.exports = {Card};