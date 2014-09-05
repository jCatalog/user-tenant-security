var Hapi = require('hapi');

var routes = require('./routes').routes();

module.exports.start = function (ip, port, options, callback) {
    options = options || {};
    var server = new Hapi.createServer(ip, port, options);
    // Add the server routes
    server.route(routes);

    server.start(function () {
        callback();
    });
};