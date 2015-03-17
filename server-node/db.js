var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/universes', function() {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;
