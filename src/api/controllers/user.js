'use strict';

/**
 * Define dependencies
 * @type {exports}
 */
var Boom = require('boom'),
    _ = require('lodash'),
    Joi = require('joi'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Tenant = mongoose.model('Tenant'),
    resource = require('../settings/resource');
/**
 * Expose the CRUD functionality for User
 *
 * @type {{
 * getAll: {handler: handler, auth: string},
 * create: {handler: handler, validate: {payload: {userId: *, firstName: *, lastName: *, password: *, passwordConfirm: *, email: *, tenantId: *}}, auth: string},
 * signup: {handler: handler, validate: {payload: {userId: *, firstName: *, lastName: *, password: *, passwordConfirm: *, email: *, tenantName: *, tenantDesc: *}}},
 * get: {handler: handler, auth: string}, update: {handler: handler, auth: string},
 * delete: {handler: handler, auth: string},
 * login: {handler: handler, auth: {mode: string, strategy: string}, plugins: {hapi-auth-cookie: {redirectTo: boolean}}},
 * logout: {handler: handler, auth: string}
 * }}
 */
module.exports = {
    /**
     * Return the list of User
     */
    getAll: {
        handler: function (request, reply) {
            var userId = request.auth.credentials.userId,
                username = request.auth.credentials.username,
                Acl = request.server.plugins.acl;
                Acl.allow(username, 'users', resource.user.action);
                Acl.isAllowed(username, 'users', 'view', function (err, allowed) {
                    console.log("allowed",allowed);
                    // if (err || !allowed) {
                    //     var error = Boom.forbidden();
                    //     return reply(error);
                    // }
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
                });
        },
        auth: 'session'
    },
    /**
     * Create a new User
     */
    create: {
        handler: function (request, reply) {
            var userId = request.auth.credentials.userId,
                username = request.auth.credentials.username,
                Acl = request.server.plugins.acl;
            Acl.allow(username, 'users', 'add');
            Acl.isAllowed(username, 'users', 'add', function (err, allowed) {
                if (err || !allowed) {
                    var error = Boom.forbidden();
                    return reply(error);
                }
                var user = new User(request.payload);
                Tenant.findById(request.payload.tenantId).exec(function (err, tenant) {
                    if (err) {
                        var error = Boom.badRequest(err);
                        return reply(error);
                    }
                    else
                    {    
                        user.create(tenant, function (err, data) {
                            if (err) {
                                var error = Boom.badRequest(err);
                                return reply(error);
                            } else {
                                Acl.addUserRoles(data.userId, 'member', function (err) {
                                    if (err) {
                                        return reply(Boom.badRequest());
                                    }
                                    return reply(data[0]).type('application/json');
                                });
                            }
                        });
                    }    
                });
            });
        },
        validate: {
            payload: {
                username: Joi.string().min(3).max(20),
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
    /**
     * Signup a new User and Tenant
     */
    signup: {
        handler: function (request, reply) {
            var user = new User(request.payload);
            var tenant = new Tenant(request.payload);
            var Acl = request.server.plugins.acl;
            user.create(tenant, function (err, data) {
                if (err) {
                    var error = Boom.badRequest(err);
                    return reply(error);
                } else {
                    Acl.addUserRoles(user.username, 'tenant-admin', function (err) {
                        if (err) {
                            return reply(Boom.badRequest());
                        }
                        return reply(user).type('application/json');
                    });
                }
            });
        },
        validate: {
            payload: {
                username: Joi.string().min(3).max(20),
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
    /**
     * Get a specific User
     */
    get: {
        handler: function (request, reply) {
            var userId = request.auth.credentials.userId,
                username = request.auth.credentials.username,
                Acl = request.server.plugins.acl;
            Acl.isAllowed(username, 'users', 'view', function (err, allowed) {
                if (err || !allowed) {
                    var error = Boom.forbidden();
                    return reply(error);
                }
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
            });
        },
        auth: 'session'
    },
    /**
     * Update a specific User
     */
    update: {
        handler: function (request, reply) {
            var userId = request.auth.credentials.userId,
                username = request.auth.credentials.username,
                updateData = request.payload,
                Acl = request.server.plugins.acl;
                delete updateData.$promise;
                delete updateData.$resolved;
            User.findById(request.params.id).exec(function (err1, user) {
                if (err1) {
                    return reply(Boom.badRequest(err1.message));
                }
                Acl.isAllowed(username, 'users', 'edit', function (err2, allowed) {
                    if (user.createdBy == userId || allowed)
                    {
                        User.findOneAndUpdate({_id:request.params.id}, updateData, function (err3, Result) {
                            if (err3) {
                                return reply(Boom.badRequest(err3.message));
                            }
                            return reply({error: null, data: Result, message: 'Updated successfully'});
                        });
                    }
                    else
                    {
                        return reply(Boom.forbidden());
                    }
                });

            });
        },
        auth: 'session'
    },
    /**
     * Delete a specific User
     * Authentication and Authorization is required to perform the action
     */
    delete: {
        handler: function (request, reply) {
            var userId = request.auth.credentials.userId,
                username = request.auth.credentials.username,
                Acl = request.server.plugins.acl;
            Acl.allow(username, 'users', 'delete');    
            Acl.isAllowed(username, 'users', 'delete', function (err, allowed) {
                if (err || !allowed) {
                    var error = Boom.forbidden();
                    return reply(error);
                }
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
            });
        },
        auth: 'session'
    },
    /**
     * Authenticate an anonymous User
     * Use the 'hapi-auth-cookie' plugin
     */
    login: {
        handler: function (request, reply) {
            if (request.auth.isAuthenticated) {
                var account = {
                    userId: request.auth.credentials.id,
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
                User.findOne({'username': request.payload.username}, '+password').exec(function (err, user) {
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
                            userId: user._id,
                            username: user.username,
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
    /**
     * Logout an already Authenticated User
     */
    logout: {
        handler: function (request, reply) {
            request.auth.session.clear();
            return reply({error: null, message: 'Logout successfully'});
        },
        auth: 'session'
    }
};
