'use strict';

/**
 * Define Dependencies
 * @type {exports}
 */
var acl = require('./lib/acl');
var mongodbBackend = require('./lib/mongodb-backend');
/**
 * Export hapi-acl module
 * @param db
 * @returns {acl}
 */
module.exports = function (db) {
    var Acl = new acl(new mongodbBackend(db, 'hapi_acl_'));
    return Acl;
};