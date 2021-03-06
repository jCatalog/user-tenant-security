'use strict';

/**
 * Define Dependencies
 * @type {requireDirectory|exports}
 */
var requireDirectory = require('require-directory');

/**
 * Return the route table for server
 * @returns {routeTable[]}
 */
var routes = function () {
    // Load the controllers into the controller name space.
    var controller = requireDirectory(module, './controllers');

    /**
     * Define route table
     * @type {*[]}
     */
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
            method: 'GET',
            path: '/tenants',
            config: controller.tenant.getAll
        },
        {
            method: 'GET',
            path: '/tenants/{id}',
            config: controller.tenant.get
        },
        {
            method: 'POST',
            path: '/tenants',
            config: controller.tenant.create
        },
        {
            method: 'PUT',
            path: '/tenants/{id}',
            config: controller.tenant.update
        },
        {
            method: 'DELETE',
            path: '/tenants/{id}',
            config: controller.tenant.delete
        },
        {
            method: 'GET',
            path: '/roles',
            config: controller.role.getAll
        },
        {
            method: ['POST'],
            path: '/login',
            config: controller.user.login
        },
        {
            method: ['POST'],
            path: '/signup',
            config: controller.user.signup
        },
        {
            method: 'POST',
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

//exports
module.exports = routes();
