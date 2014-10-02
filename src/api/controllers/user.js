'use strict';

var Boom = require('boom'),
    _ = require('lodash'),
    Joi = require('joi'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Tenant = mongoose.model('Tenant');

//Expose the CRUD functionality
module.exports = {
    getAll: {
        handler: function (request, reply) {
            var page = (request.query.page ? request.query.page - 1 : 0),
                count = request.query.count || 10,
                sorting = request.query.sorting || {'createdAt': 'desc'},
                filter = {};

            if (request.query.filter) {
                filter = request.query.filter;
            }

            User.find(filter)
                .sort(sorting)
                .limit(count)
                .skip(page * count)
                .exec(function (err, users) {
                    if (err) {
                        var error = Boom.badRequest(err);
                        return reply(error);
                    }
                    User.count(function (err, total) {
                        if (err) {
                            var error = Boom.badRequest(err);
                            return reply(error);
                        }
                        return reply({total: total, users: users}).type('application/json');
                    });
                });
        },
        auth: 'session'
    },
    create: {
        handler: function (request, reply) {
            var user = new User(request.payload);
            Tenant.findById(request.payload.tenantId).exec(function (err, tenant) {
                if (err) {
                    var error = Boom.badRequest(err);
                    return reply(error);
                }
                user.create(tenant, function (err, data) {
                    if (err) {
                        var error = Boom.badRequest(err);
                        return reply(error);
                    } else {
                        return reply(data[0]).type('application/json');
                    }
                });
            });
        },
        validate: {
            payload: {
                userId: Joi.string().min(3).max(20),
                firstName: Joi.string().min(3).max(20),
                lastName: Joi.string().min(3).max(20),
                password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
                passwordConfirm: Joi.ref('password'),
                email: Joi.string().email(),
                tenantId: Joi.string()
            }
        },
        auth: 'session'
    },
    signup: {
        handler: function (request, reply) {
            var user = new User(request.payload);
            var tenant = new Tenant(request.payload);
            user.create(tenant, function (err, data) {
                if (err) {
                    var error = Boom.badRequest(err);
                    return reply(error);
                } else {
                    return reply(data[0]).type('application/json');
                }
            });
        },
        validate: {
            payload: {
                userId: Joi.string().min(3).max(20),
                firstName: Joi.string().min(3).max(20),
                lastName: Joi.string().min(3).max(20),
                password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
                passwordConfirm: Joi.ref('password'),
                email: Joi.string().email(),
                tenantName: Joi.string().min(3).max(20),
                tenantDesc: Joi.string()
            }
        }
    },
    get: {
        handler: function (request, reply) {
            User.findById(request.params.id).exec(function (err, user) {
                if (err) throw err;

                if (user === null) {
                    var error = Boom.badRequest('No doc found in');
                    return reply(error);
                }
                else {
                    return reply(user).type('application/json');
                }
            });
        },
        auth: 'session'
    },
    update: {
        handler: function (request, reply) {
            var update = request.payload;
            User.findByIdAndUpdate(request.params.id, update).exec(function (err, user) {
                if (err) {
                    var error = Boom.badRequest(err.message);
                    return reply(error);
                }
                else {
                    return reply({error: null, data: user, message: 'Updated successfully'});
                }
            });
        },
        auth: 'session'
    },
    delete: {
        handler: function (request, reply) {
            User.findByIdAndRemove(request.params.id).exec(function (err, user) {
                if (err) {
                    return reply(Boom.badRequest(err));
                } else if (!user) {
                    var error = Boom.notFound('No data found');
                    return reply(error);
                }
                else {
                    return reply({error: null, message: 'Deleted successfully'});
                }
            });
        },
        auth: 'session'
    },
    login: {
        handler: function (request, reply) {
            if (request.auth.isAuthenticated) {
                var account = {
                    username: request.auth.credentials.username,
                    firstName: request.auth.credentials.firstName,
                    lastName: request.auth.credentials.lastName
                };
                return reply({error: null, user: account, message: 'Login successfully'});
            }

            if (!request.payload.username || !request.payload.password) {
                return reply(Boom.badRequest('Missing username or password'));
            }
            else {
                User.findOne({'userId': request.payload.username}).select('+password').exec(function (err, user) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    if (!user) {
                        return reply(Boom.badRequest('Invalid username or password'));
                    }
                    user.comparePassword(request.payload.password, function (err, isPasswordMatch) {
                        if (err) {
                            return reply(Boom.badRequest('Invalid username or password'));
                        }
                        if (!user.firstLogin)
                            user.firstLogin = new Date();
                        user.lastLogin = new Date();
                        user.save();
                        var account = {
                            username: user.userId,
                            firstName: user.firstName,
                            lastName: user.lastName
                        };
                        request.auth.session.set(account);
                        return reply({error: null, user: account, message: 'Login successfully'});
                    });
                });
            }
        },
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        }
    },
    logout: {
        handler: function (request, reply) {
            request.auth.session.clear();
            return reply({error: null, message: 'Logout successfully'});
        },
        auth: 'session'
    }
};
