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
    },
    get: {
        handler: function (request, reply) {
            Tenant.findById(request.params.id).exec(function (err, tenant) {
                if (err) throw err;

                if (tenant === null) {
                    var error = Boom.badRequest('No doc found in');
                    return reply(error);
                }
                else {
                    return reply(tenant).type('application/json');
                }
            });
        },
        auth: 'session'
    },
    update: {
        handler: function (request, reply) {
            var update = request.payload;
            Tenant.findByIdAndUpdate(request.params.id, update).exec(function (err, tenant) {
                if (err) {
                    var error = Boom.badRequest('No data found');
                    return reply(error);
                }
                else {
                    return reply({error: null, message: 'Updated successfully'});
                }
            });
        },
        auth: 'session'
    },
    delete: {
        handler: function (request, reply) {
            Tenant.findByIdAndRemove(request.params.id).exec(function (err, tenant) {
                if (err) {
                    return reply(Boom.badRequest(err));
                } else if (!tenant) {
                    var error = Boom.notFound('No data found');
                    return reply(error);
                }
                else {
                    return reply({error: null, message: 'Deleted successfully'});
                }
            });
        },
        auth: 'session'
    }
};
