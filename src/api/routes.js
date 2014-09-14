'use strict';

var requireDirectory = require('require-directory');

/**
 *
 * @returns {routeTable[]}
 */
var routes = function () {
    // Load the controllers into the controller name space.
    var controller = requireDirectory(module, './controllers');

    var routeTable = [
        {
            method: ['POST'],
            path: '/login',
            config: controller.auth.login
        },
        {
            method: 'GET',
            path: '/logout',
            config: controller.auth.logout
        },
        {
            method: 'GET',
            path: '/',
            config: {
                handler: function (request, reply) {
                    reply.view('index');
                }
            }
        },
        {
            method: 'GET',
            path: '/users',
            handler: controller.user.getAll
        },
        {
            method: 'GET',
            path: '/users/{id}',
            handler: controller.user.get
        },
        {
            method: 'POST',
            path: '/users',
            handler: controller.user.create
        },
        {
            method: 'PUT',
            path: '/users/{id}',
            handler: controller.user.update
        },
        {
            method: 'DELETE',
            path: '/users/{id}',
            handler: controller.user.delete
        },
        {
            method: 'GET',
            path: '/partials/{path*}',
            config: controller.assets.partials
        },
        {
            method: 'GET',
            path: '/img/{path*}',
            config: controller.assets.images
        },
        {
            method: 'GET',
            path: '/css/{path*}',
            config: controller.assets.css
        },
        {
            method: 'GET',
            path: '/fonts/{path*}',
            config: controller.assets.fonts
        },
        {
            method: 'GET',
            path: '/js/{path*}',
            config: controller.assets.js
        },
        {
            method: 'GET',
            path: '/lib/{path*}',
            config: controller.assets.lib
        }
    ];
    return routeTable;
};

module.exports = routes();
