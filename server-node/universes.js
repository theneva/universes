var express = require('express');
var bodyParser = require('body-parser');

var db = require('./db');

var port = 2345;

var app = express();

// TODO only server ../angular/public with compiled assets
app.use(express.static(__dirname + '/../angular'));
app.use(bodyParser.json());

app.use('/api', require('./controllers'));

app.listen(port);
console.log();
