'use strict';

var Boom = require('boom');
var dbInstance = require('../settings/database').dbInstance;
var Acl = require('acl');
var acl = new Acl(new Acl.mongodbBackend(dbInstance.db));

//Expose the CRUD functionality
module.exports = {
    getAll: {
        handler: function (request, reply) {
            var page = (request.query.page ? request.query.page - 1 : 0),
                count = request.query.count || 10,
                sorting = request.query.sorting || {'createdAt': 'desc'};

            acl.userRoles('mislam1', function (err, roles) {
                if (err) {
                    var error = Boom.badRequest(err);
                    return reply(error);
                }
                return reply({total: roles.count, roles: roles}).type('application/json');
            });
        },
        auth: 'session'
    },
    create: {
        handler: function (request, reply) {
            //var role = new Tenant(request.payload);
            acl.addUserRoles('mislam1', 'admin', function (err) {
                if (err) {
                    var error = Boom.badRequest(err);
                    return reply(error);
                }
                return reply({error: null, message: 'Create Role successfully'});
            });
        },
        auth: 'session'
    }
};
