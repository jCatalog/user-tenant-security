'use strict';

var Boom = require('boom'),
    mongoose= require('mongoose');

//Expose the CRUD functionality
module.exports = {
    getAll: {
        handler: function (request, reply) {
            var page = (request.query.page ? request.query.page - 1 : 0),
                count = request.query.count || 10,
                sorting = request.query.sorting || {'createdAt': 'desc'};

        },
        auth: 'session'
    },
    create: {
        handler: function (request, reply) {

        },
        auth: 'session'
    }
};
