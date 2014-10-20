'use strict';

/**
 * Define Dependencies
 * @type {exports}
 */
var Hapi = require('hapi'),
    Path = require('path'),
    config = require('./config');

var db = require('./src/api/models/db')(config.get('/mongodb/url'));
var port = config.get('/port/api');
var routes = require('./src/api/routes');

/**
 * Set server options
 * @type {{views: {engines: {html: (handlebars|exports)}, path: *}}}
 */
var serverOptions = {
    views: {
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, './src/web/views')
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
    },
    {
        plugin: require('./src/api/plugins/hapi-mailer'),
        options: {
            mailer: config.get('/nodemailer'),
            from: config.get('/system/fromAddress')
        }
    },
    {
        plugin: require('./src/api/plugins/hapi-acl'),
        options: {
            db: db,
            prefix: 'hapi_acl_'
        }
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