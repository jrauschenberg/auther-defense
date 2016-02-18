'use strict';

const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

var app = require('./app'),
	db = require('./db');

var server = https.createServer(options, app).listen(8080, function(){console.log('HTTP server patiently listening on port 8080, dude.')});

// var port = 8080;
// var server = app.listen(port, function () {
// 	console.log('HTTP server patiently listening on port', port);
// });

module.exports = server;