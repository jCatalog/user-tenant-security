'use strict';

var Hapi = require('hapi');
var port = process.env.PORT || 3000;

var routes = require('./settings/routes').routes();
var server = new Hapi.Server(port);
server.route(routes);

if (!module.parent) {
    server.start(function() {
        console.log('Server started', server.info.uri);
    });
}

module.exports = server;