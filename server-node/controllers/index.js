var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var secrets = require('../private/secrets');

router.get('/', function (req, res) {
    res.json('Hello, universes!');
});

var Race = require('../models/race.model');

router.get('/races', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    Race.find(function (err, races) {
        res.json(races);
    });
});

router.post('/races', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    var race = new Race(req.body);
    race.save();
    return res.status(201).json(race);
});

router.delete('/races/:id', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    Race.findByIdAndRemove(req.params.id, function (err, removedRace) {
        if (!removedRace) {
            return res.status(404).send('No race with id: ' + req.params.id);
        }

        return res.status(204).json(removedRace);
    });
});

var Character = require('../models/character.model');

router.get('/characters', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    Character.find(function (err, characters) {
        res.json(characters);
    });
});

router.get('/characters/:id', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    Character.findById(req.params.id, function (err, character) {
        if (!character) {
            return res.status(404).send('No character found with id: ' + req.params.id);
        }

        res.json(character);
    });
});

router.put('/characters/:id', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    var updatedCharacter = req.body;

    Character.findById(req.params.id, function (err, character) {
        if (!character) {
            return res.status(404).send('No character found with id: ' + req.params.id);
        }

        for (var field in updatedCharacter) {
            console.log(field);
            character[field] = updatedCharacter[field];
        }

        console.log(character);
        character.save();
        return character;
    })
});

router.post('/characters', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    var character = new Character(req.body);
    character.save();
    res.status(201).json(character);
});

router.delete('/characters/:id', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    Character.findByIdAndRemove(req.params.id, function (err, removedCharacter) {
        if (!removedCharacter) {
            return res.status(404).send('No character with id: ' + req.params.id);
        }

        return res.status(204).json(removedCharacter);
    });
});

var User = require('../models/user.model');

router.get('/users', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    User.find(function (err, users) {
        return res.json(users);
    });
});

router.post('/users', function (req, res) {
    var token = req.header('authorization');
    if (!token) return res.status(401).send('No token supplied');
    var user = jwt.decode(token, secrets.jwt);

    var newUser = req.body;

    if (!newUser
        || !newUser.username
        || !newUser.password) {
        return res.status(412).send('Request body must contain {username, password}');
    }

    bcrypt.hash(newUser.password, 10, function (err, hash) {
        console.log(newUser);
        delete newUser.password;
        newUser.passwordHash = hash;

        var user = new User(newUser);
        user.save();

        return res.status(201).json(user);
    });
});

router.delete('/users/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, removedUser) {
        if (!removedUser) {
            return res.status(404).send('No user with id: ' + req.params.id);
        }

        return res.status(204).json(removedUser);
    });
});

router.post('/sessions', function (req, res) {
    var loginAttempt = req.body;

    if (!loginAttempt
        || !loginAttempt.username
        || !loginAttempt.username) {
        return res.status(401).send('Login attempt must provide {username, password}');
    }

    User.findOne({username: loginAttempt.username}, function (err, user) {
        if (!user) {
            return res.status(401).send('Wrong username or password');
        }

        bcrypt.compare(loginAttempt.password, user.passwordHash, function (err, match) {
            if (!match) {
                return res.status(401).send('Wrong username or password');
            }

            var payload = {username: loginAttempt.username};
            var token = jwt.encode(payload, secrets.jwt);
            return res.json(token);
        });
    });
});

module.exports = router;
