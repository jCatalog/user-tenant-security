'use strict';

/**
 * Define Dependencies
 * @type {exports}
 */
var acl = require('./lib/acl');
var backend = require('./lib/backend');
/**
 * Export hapi-acl module
 * @param db
 * @returns {acl}
 */
module.exports = function (db) {
    return new acl(new backend(db, 'hapi_acl_'));
};