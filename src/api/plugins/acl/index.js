'use strict';

var Acl = require('acl');

exports.register = function (plugin, options, next) {
    if(options.db) {
        var acl = new Acl(new Acl.mongodbBackend(options.db.db, 'hapi_acl_'));
    }
    plugin.route({
        method: 'GET',
        path: '/version',
        handler: function (request, reply) {
            console.log(acl);
            reply('1.0.0');
        }
    });
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};