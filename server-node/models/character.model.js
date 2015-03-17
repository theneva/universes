var db = require('../db');

var Character = db.model('Character', {
    name: String,
    race: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = Character;
