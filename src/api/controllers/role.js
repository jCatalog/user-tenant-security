'use strict';

/**
 * Define dependencies
 * @type {exports}
 */
var Boom = require('boom'),
    mongoose = require('mongoose'),
    resource = require('../settings/resource')

/**
 * Expose the CRUD functionality for Role
 * @type {{getAll: {handler: handler, auth: string}}}
 */
module.exports = {
    /**
     * Return a list of Role
     */
    getAll: {
        handler: function (request, reply) {
            var Acl = request.server.plugins.acl;
            Acl.allow('admin', [resource.role.name, resource.tenant.name, resource.user.name], resource.role.action);
            Acl.allow('tenant-admin', resource.user.name, resource.user.action);
            Acl.allRoles(function (err, roles) {
                if (err) return reply(Boom.badRequest(err.message));
                return reply({roles: roles}).type('application/json');
            });
        },
        auth: 'session'
    }
};
