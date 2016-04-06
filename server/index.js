'use strict';

var app = require('./app'),
	db = require('./db');

var port = 8080;
var server = app.listen(port, function () {
	console.log('HTTP server patiently listening on port', port);
});

module.exports = server;