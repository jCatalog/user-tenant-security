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
            method: 'GET',
            path: '/',
            config: {
                handler: function (request, reply) {
                    reply.view('index');
                }
            }
        },
        {
            method: ['POST'],
            path: '/login',
            config: controller.user.login
        },
        {
            method: 'GET',
            path: '/logout',
            config: controller.user.logout
        },
        {
            method: 'GET',
            path: '/users',
            config: controller.user.getAll
        },
        {
            method: 'GET',
            path: '/users/{id}',
            config: controller.user.get
        },
        {
            method: 'POST',
            path: '/users',
            config: controller.user.create
        },
        {
            method: 'PUT',
            path: '/users/{id}',
            config: controller.user.update
        },
        {
            method: 'DELETE',
            path: '/users/{id}',
            config: controller.user.delete
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
