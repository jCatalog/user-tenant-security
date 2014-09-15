'use strict';

var Boom = require('boom');
var Bcrypt = require('bcryptjs');
var salt = Bcrypt.genSaltSync(10);
var User = require('../models/user');

//Expose the CRUD functionality
module.exports = {
    getAll: {
        handler: function (request, reply) {
            User.find().sort('-created').exec(function (err, users) {
                if (err) {
                    var error = Boom.badRequest(err);
                    return reply(error);
                }
                return reply(users).type('application/json');
            });
        },
        auth: 'session'
    },
    create: {
        handler: function (request, reply) {
            var user = new User(request.payload);

            // Save the user
            user.save(function (err, data) {
                if (err) {
                    var error = Boom.badRequest(err);
                    return reply(error);
                } else {
                    // Remove sensitive data before login
                    user.password = undefined;
                    user.salt = undefined;
                    return reply(data[0]).type('application/json');
                }
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
                User.findOne({'userId': request.payload.username}).exec(function (err, user) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    } else if (!user || user.password !== request.payload.password) {
                        var error = Boom.badRequest('Invalid username or password');
                        return reply(error);
                    } else {
                        var account = {
                            username: user.userId
                        };
                        request.auth.session.set(account);
                        return reply({error: null, user: account, message: 'Login successfully'});
                    }
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
        },
        auth: 'session'
    }
};
