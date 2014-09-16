'use strict';

var Boom = require('boom');
var Tenant = require('../models/tenant');

//Expose the CRUD functionality
module.exports = {
    getAll: {
        handler: function (request, reply) {
            var page = (request.query.page ? request.query.page - 1 : 0),
                count = request.query.count || 10,
                sorting = request.query.sorting || {'createdAt': 'desc'};

            Tenant.find()
                .sort(sorting)
                .limit(count)
                .skip(page * count)
                .exec(function (err, tenants) {
                    if (err) {
                        var error = Boom.badRequest(err);
                        return reply(error);
                    }
                    Tenant.count(function (err, total) {
                        if (err) {
                            var error = Boom.badRequest(err);
                            return reply(error);
                        }
                        return reply({total: total, tenants: tenants}).type('application/json');
                    });
                });
        },
        auth: 'session'
    },
    create: {
        handler: function (request, reply) {
            var tenant = new Tenant(request.payload);

            // Save the tenant
            tenant.save(function (err, data) {
                if (err) {
                    var error = Boom.badRequest(err);
                    return reply(error);
                } else {
                    return reply(data[0]).type('application/json');
                }
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
