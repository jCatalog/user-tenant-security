'use strict';

var Hapi = require('hapi');
var Path = require('path');

var port = process.env.PORT || 3000;

var routes = require('./routes');
var serverOptions = {
    views: {
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, '../public/views')
    }
};
var server = new Hapi.Server(port, serverOptions);
server.route(routes);

if (!module.parent) {
    server.start(function () {
        console.log('Server started', server.info.uri);
    });
}

module.exports = server;