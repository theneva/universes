var db = require('../db');

var Race = db.model('Race', {
    raceType: String,
    earType: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = Race;
