'use strict';

// Declare internals

var internals = {};


exports.register = function (plugin, options, next) {
    plugin.ext('onPostAuth', function (request, reply) {
        reply();
    });

    next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};
