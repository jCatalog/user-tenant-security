var server = require('./config/server');

var ip = "127.0.0.1";
var port = process.env.PORT || 3000;
var options = {};

// Start the server
server.start(ip, port, options, function() {
    console.log('server started');
});