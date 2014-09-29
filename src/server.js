'use strict';

var Hapi = require('hapi');
var Path = require('path');
var dbInstance = require('./api/settings/database').db;
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

server.pack.register([
    {
        plugin: require('hapi-auth-cookie')
    },
    {
        plugin: require('./api/plugins/acl'),
        options: {db: dbInstance}
    }
], function (err) {
    server.auth.strategy('session', 'cookie', {
        password: 'usertenantsecurity1290',
        cookie: 'usertenantsecurity',
        redirectTo: false,
        isSecure: false
    });

    server.route(routes);

    server.start(function () {
        console.log('Server started', server.info.uri);
    });
});

module.exports = server;