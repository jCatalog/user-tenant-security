'use strict';

var Boom = require('boom');
var User = require('../models/user');
var securityProvider = require('../util/security-provider');

//Expose the CRUD functionality
module.exports = {
    getAll: {
        handler: function (request, reply) {
            var page = (request.query.page ? request.query.page - 1 : 0),
                count = request.query.count || 10,
                sorting = request.query.sorting || {'createdAt': 'desc'};

            User.find()
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
            securityProvider.cryptPassword(request.payload.password, function (err, hash) {
                if (err) {
                    var error = Boom.badRequest(err);
                    return reply(error);
                }

                var user = new User(request.payload);
                user.password = hash;
                // Save the user
                user.save(function (err, data) {
                    if (err) {
                        var error = Boom.badRequest(err);
                        return reply(error);
                    } else {
                        // Remove sensitive data before login
                        user.password = undefined;
                        return reply(data[0]).type('application/json');
                    }
                });
            });
        },
        auth: 'session'
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
                    username: request.auth.credentials.username
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
                    securityProvider.comparePassword(request.payload.password, user.password, function (err, isPasswordMatch) {
                        if(err){
                            return reply(Boom.badRequest('Invalid username or password'));
                        }
                        var account = {
                            username: user.userId
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
