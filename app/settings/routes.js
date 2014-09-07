/**
 * Dependencies.
 */
var requireDirectory = require('require-directory');

module.exports.routes = function () {
    // Load the controllers into the controller name space. https://github.com/troygoode/node-require-directory
    var controller = requireDirectory(module, '../controllers');
    var validate = requireDirectory(module, '../validate')

    // Array of routes for Hapi
    var routeTable = [
        {
            method: 'GET',
            path: '/user',
            handler: controller.user.getAll
        },
        {
            method: 'GET',
            path: '/user/{id}',
            handler: controller.user.get,
            config: {
                validate: validate.user.get
            }
        },
        {
            method: 'POST',
            path: '/user/register',
            handler: controller.user.create,
            config: {
                validate: validate.user.create
            }
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
}
