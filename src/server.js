'use strict';

/**
 * Define Dependencies
 * @type {exports}
 */
var Hapi = require('hapi'),
    Path = require('path'),
    mongoose = require('mongoose');

var port = process.env.PORT || 3000;
var model = require('./api/models')();
var routes = require('./api/routes');

/**
 * Set server options
 * @type {{views: {engines: {html: (handlebars|exports)}, path: *}}}
 */
var serverOptions = {
    views: {
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, './web/views')
    }
};

/**
 * Create a new Hapi server
 * @type {exports.Server}
 */
var server = new Hapi.Server(port, serverOptions);

/**
 * Register hapi plugin
 */
server.pack.register([
    {
        plugin: require('hapi-auth-cookie')
    }
], function (err) {
    server.auth.strategy('session', 'cookie', {
        password: 'usertenantsecurity1290',
        cookie: 'usertenantsecurity',
        redirectTo: false,
        isSecure: false
    });

    /**
     * Add routes for server
     */
    server.route(routes);

    /**
     * Start the Hapi server
     */
    server.start(function () {
        console.log('Server started', server.info.uri);

    });
});

//exports
module.exports = server;