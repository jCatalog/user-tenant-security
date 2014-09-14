'use strict';
var users = {
    john: {
        id: 'john',
        password: 'password',
        name: 'John Doe'
    }
};

module.exports = {
    login: {
        handler: function (request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.redirect('/');
            }

            var message = '';
            var account = null;

            if (request.method === 'post') {

                if (!request.payload.username || !request.payload.password) {

                    message = 'Missing username or password';
                }
                else {
                    account = users[request.payload.username];
                    if (!account ||
                        account.password !== request.payload.password) {

                        message = 'Invalid username or password';
                    }
                }
            }
            request.auth.session.set(account);
            return reply.redirect('/');
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
            return reply.redirect('/');
        },
        auth: 'session'
    }
};