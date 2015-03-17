var router = require('express').Router();

router.get('/', function (req, res) {
    res.json('Hello, universes!');
});

var Race = require('../models/race.model');

router.get('/races', function (req, res) {
    Race.find(function (err, races) {
        res.json(races);
    });
});

router.post('/races', function (req, res) {
    var race = new Race(req.body);
    race.save();
    return res.status(201).json(race);
});

router.delete('/races/:id', function (req, res) {
    Race.findByIdAndRemove(req.params.id, function(err, removedRace) {
        if (!removedRace) {
            return res.status(404).send('No race with id: ' + req.params.id);
        }

        return res.status(204).json(removedRace);
    });
});

var Character = require('../models/character.model');

router.get('/characters', function(req, res) {
    Character.find(function(err, characters) {
        res.json(characters);
    });
});

router.post('/characters', function(req, res) {
    var character = new Character(req.body);
    character.save();
    res.status(201).json(character);
});

router.delete('/characters/:id', function(req, res) {
    Character.findByIdAndRemove(req.params.id, function(err, removedCharacter) {
        if (!removedCharacter) {
            return res.status(404).send('No character with id: ' + req.params.id);
        }

        return res.status(204).json(removedCharacter);
    });
});

module.exports = router;
