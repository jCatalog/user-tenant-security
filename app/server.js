var Hapi = require('hapi');

var PORT = process.env.PORT || 3000;
var server = new Hapi.Server(PORT);

// Require the routes and pass the server object.
var routes = require('./config/routes')(server);
// Add the server routes
server.route(routes);

server.start(function () {
    console.log("Server running at " + server.info.uri);
});