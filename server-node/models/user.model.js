var db = require('../db');

var User = db.model('User', {
    username: String,
    passwordHash: {type: String},
    createdAt: {type: Date, default: Date.now}
});

module.exports = User;
