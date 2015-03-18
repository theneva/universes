var db = require('../db');

var Character = db.model('Character', {
    name: String,
    nickname: String,
    race: String,
    imageUrl: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = Character;
