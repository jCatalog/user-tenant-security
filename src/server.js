'use strict';

var Hapi = require('hapi');
var Path = require('path');

var port = process.env.PORT || 3000;

var routes = require('./api/routes');
var serverOptions = {
    views: {
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, './web/views')
    }
};
var server = new Hapi.Server(port, serverOptions);


if (!module.parent) {
    server.pack.register(require('hapi-auth-cookie'), function (err) {
        server.auth.strategy('session', 'cookie', {
            password: 'secret',
            cookie: 'usertenantsecurity',
            redirectTo: '/',
            isSecure: false
        });
        server.route(routes);
        server.start(function () {
            console.log('Server started', server.info.uri);
        });
    });
}

module.exports = server;