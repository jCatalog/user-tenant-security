'use strict';

// Declare internals
var _ = require('lodash'),
    util = require('util'),
    bluebird = require('bluebird'),
    contract = require('./contract'),
    mongodbBackend = require('./backend');

var backend = {};
var internals = {};
/**
 addUserRoles( userId, roles, function(err) )

 Adds roles to a given user id.

 @param {String|Number} User id.
 @param {String|Array} Role(s) to add to the user id.
 @param {Function} Callback called when finished.
 @return {Promise} Promise resolved when finished
 */
internals.addUserRoles = function (userId, roles, cb) {
    var promise = bluebird.defer();

    contract(arguments)
        .params('string|number', 'string|array', 'function')
        .params('string|number', 'string|array')
        .end();

    var transaction = backend.begin();
    backend.add(transaction, 'meta', 'users', userId);
    backend.add(transaction, 'users', userId, roles);
    return backend.endAsync(transaction).nodeify(cb);
};

/**
 removeUserRoles( userId, roles, function(err) )

 Remove roles from a given user.

 @param {String|Number} User id.
 @param {String|Array} Role(s) to remove to the user id.
 @param {Function} Callback called when finished.
 @return {Promise} Promise resolved when finished
 */
internals.removeUserRoles = function (userId, roles, cb) {
    contract(arguments)
        .params('string|number', 'string|array', 'function')
        .params('string|number', 'string|array')
        .end();

    var transaction = backend.begin();
    backend.remove(transaction, 'users', userId, roles);
    return backend.endAsync(transaction).nodeify(cb);
};

/**
 userRoles( userId, function(err, roles) )

 Return all the roles from a given user.

 @param {String|Number} User id.
 @param {Function} Callback called when finished.
 @return {Promise} Promise resolved with an array of user roles
 */
internals.userRoles = function (userId, cb) {
    return backend.getAsync('users', userId).nodeify(cb);
};

/**
 addRoleParents( role, parents, function(err) )

 Adds a parent or parent list to role.

 @param {String|Number} User id.
 @param {String|Array} Role(s) to remove to the user id.
 @param {Function} Callback called when finished.
 @return {Promise} Promise resolved when finished
 */
internals.addRoleParents = function (role, parents, cb) {
    contract(arguments)
        .params('string|number', 'string|array', 'function')
        .params('string|number', 'string|array')
        .end();

    var transaction = backend.begin();
    backend.add(transaction, 'meta', 'roles', role);
    backend.add(transaction, 'parents', role, parents);
    return backend.endAsync(transaction).nodeify(cb);
};

/**
 removeRole( role, function(err) )

 Removes a role from the system.

 @param {String} Role to be removed
 @param {Function} Callback called when finished.
 */
internals.removeRole = function (role, cb) {
    contract(arguments)
        .params('string', 'function')
        .params('string').end();

    // Note that this is not fully transactional.
    return backend.getAsync('resources', role).then(function (resources) {
        var transaction = backend.begin();

        resources.forEach(function (resource) {
            var bucket = allowsBucket(resource);
            backend.del(transaction, bucket, role);
        });

        backend.del(transaction, 'resources', role);
        backend.del(transaction, 'parents', role);
        backend.remove(transaction, 'meta', 'roles', role);

        // `users` collection keeps the removed role
        // because we don't know what users have `role` assigned.
        return backend.endAsync(transaction);
    }).nodeify(cb);
};

/**
 removeResource( resource, function(err) )

 Removes a resource from the system

 @param {String} Resource to be removed
 @param {Function} Callback called when finished.
 @return {Promise} Promise resolved when finished
 */
internals.removeResource = function (resource, cb) {
    contract(arguments)
        .params('string', 'function')
        .params('string')
        .end();

    return backend.getAsync('meta', 'roles').then(function (roles) {
        var transaction = backend.begin();
        backend.del(transaction, allowsBucket(resource), roles);
        roles.forEach(function (role) {
            backend.remove(transaction, 'resources', role, resource);
        });
        return backend.endAsync(transaction);
    }).nodeify(cb)
};

/**
 allow( roles, resources, permissions, function(err) )

 Adds the given permissions to the given roles over the given resources.

 @param {String|Array} role(s) to add permissions to.
 @param {String|Array} resource(s) to add permisisons to.
 @param {String|Array} permission(s) to add to the roles over the resources.
 @param {Function} Callback called when finished.

 allow( permissionsArray, function(err) )

 @param {Array} Array with objects expressing what permissions to give.

 [{roles:{String|Array}, allows:[{resources:{String|Array}, permissions:{String|Array}]]

  @param {Function} Callback called when finished.
 @return {Promise} Promise resolved when finished
 */
internals.allow = function (roles, resources, permissions, cb) {
    contract(arguments)
        .params('string|array', 'string|array', 'string|array', 'function')
        .params('string|array', 'string|array', 'string|array')
        .params('array', 'function')
        .params('array')
        .end();

    if ((arguments.length == 1) || ((arguments.length === 2) && _.isObject(roles) && _.isFunction(resources))) {
        return internals._allowEx(roles).nodeify(resources);
    } else {

        roles = makeArray(roles);
        resources = makeArray(resources);

        var transaction = backend.begin();

        backend.add(transaction, 'meta', 'roles', roles);

        resources.forEach(function (resource) {
            roles.forEach(function (role) {
                backend.add(transaction, allowsBucket(resource), role, permissions);
            });
        });

        roles.forEach(function (role) {
            backend.add(transaction, 'resources', role, resources);
        });

        return backend.endAsync(transaction).nodeify(cb);
    }
};


internals.removeAllow = function (role, resources, permissions, cb) {
    contract(arguments)
        .params('string', 'string|array', 'string|array', 'function')
        .params('string', 'string|array', 'string|array')
        .params('string', 'string|array', 'function')
        .params('string', 'string|array')
        .end();

    resources = makeArray(resources);
    if (cb || !_.isFunction(permissions)) {
        permissions = makeArray(permissions);
    } else {
        cb = permissions;
        permissions = null;
    }

    return internals.removePermissions(role, resources, permissions, cb);
}

/**
 removePermissions( role, resources, permissions)

 Remove permissions from the given roles owned by the given role.

 Note: we loose atomicity when removing empty role_resources.

 @param {String}
 @param {String|Array}
 @param {String|Array}
 */
internals.removePermissions = function (role, resources, permissions, cb) {
    var transaction = backend.begin();
    resources.forEach(function (resource) {
        var bucket = allowsBucket(resource);
        if (permissions) {
            backend.remove(transaction, bucket, role, permissions);
        } else {
            backend.del(transaction, bucket, role);
            backend.remove(transaction, 'resources', role, resource);
        }
    });

    // Remove resource from role if no rights for that role exists.
    // Not fully atomic...
    return backend.endAsync(transaction).then(function () {
        var transaction = backend.begin();
        return bluebird.all(resources.map(function (resource) {
            var bucket = allowsBucket(resource);
            return backend.getAsync(bucket, role).then(function (permissions) {
                if (permissions.length == 0) {
                    backend.remove(transaction, 'resources', role, resource);
                }
            });
        })).then(function () {
            return backend.endAsync(transaction);
        });
    }).nodeify(cb);
};

/**
 allowedPermissions( userId, resources, function(err, obj) )

 Returns all the allowable permissions a given user have to
 access the given resources.

 It returns an array of objects where every object maps a
 resource name to a list of permissions for that resource.

 @param {String|Number} User id.
 @param {String|Array} resource(s) to ask permissions for.
 @param {Function} Callback called when finished.
 */
internals.allowedPermissions = function (userId, resources, cb) {
    contract(arguments)
        .params('string|number', 'string|array', 'function')
        .params('string|number', 'string|array')
        .end();

    resources = makeArray(resources);

    return internals.userRoles(userId).then(function (roles) {
        var result = {};
        return bluebird.all(resources.map(function (resource) {
            return internals._resourcePermissions(roles, resource).then(function (permissions) {
                result[resource] = permissions;
            });
        })).then(function () {
            return result;
        });
    }).nodeify(cb);
};

/**
 isAllowed( userId, resource, permissions, function(err, allowed) )

 Checks if the given user is allowed to access the resource for the given
 permissions (note: it must fulfill all the permissions).

 @param {String|Number} User id.
 @param {String|Array} resource(s) to ask permissions for.
 @param {String|Array} asked permissions.
 @param {Function} Callback called wish the result.
 */
internals.isAllowed = function (userId, resource, permissions, cb) {
    contract(arguments)
        .params('string|number', 'string', 'string|array', 'function')
        .params('string|number', 'string', 'string|array')
        .end();

    return backend.getAsync('users', userId).then(function (roles) {
        if (roles.length) {
            return internals.areAnyRolesAllowed(roles, resource, permissions);
        } else {
            return false;
        }
    }).nodeify(cb);
};

/**
 areAnyRolesAllowed( roles, resource, permissions, function(err, allowed) )

 Returns true if any of the given roles have the right permissions.

 @param {String|Array} Role(s) to check the permissions for.
 @param {String} resource(s) to ask permissions for.
 @param {String|Array} asked permissions.
 @param {Function} Callback called with the result.
 */
internals.areAnyRolesAllowed = function (roles, resource, permissions, cb) {
    contract(arguments)
        .params('string|array', 'string', 'string|array', 'function')
        .params('string|array', 'string', 'string|array')
        .end();

    roles = makeArray(roles);
    permissions = makeArray(permissions);

    if (roles.length === 0) {
        return bluebird.resolve(false).nodeify(cb);
    } else {

        return internals._checkPermissions(roles, resource, permissions).nodeify(cb);
    }
};

/**
 whatResources(role, function(err, {resourceName: [permissions]})

 Returns what resources a given role or roles have permissions over.

 whatResources(role, permissions, function(err, resources) )

 Returns what resources a role has the given permissions over.

 @param {String|Array} Roles
 @param {String[Array} Permissions
 @param {Function} Callback called wish the result.
 */
internals.whatResources = function (roles, permissions, cb) {
    contract(arguments)
        .params('string|array')
        .params('string|array', 'string|array')
        .params('string|array', 'function')
        .params('string|array', 'string|array', 'function')
        .end();

    roles = makeArray(roles);
    if (_.isFunction(permissions)) {
        cb = permissions;
        permissions = undefined;
    } else if (permissions) {
        permissions = makeArray(permissions);
    }

    return internals.permittedResources(roles, permissions, cb);
};

internals.permittedResources = function (roles, permissions, cb) {
    var result = _.isUndefined(permissions) ? {} : [];
    return internals._rolesResources(roles).then(function (resources) {
        return bluebird.all(resources.map(function (resource) {
            return internals._resourcePermissions(roles, resource).then(function (p) {
                if (permissions) {
                    var commonPermissions = _.intersection(permissions, p);
                    if (commonPermissions.length > 0) {
                        result.push(resource);
                    }
                } else {
                    result[resource] = p;
                }
            });
        })).then(function () {
            return result;
        });
    }).nodeify(cb);
};

internals.allRoles = function (cb) {
    var result = {};
    return backend.getAsync('meta', 'roles').then(function (roles) {
            return bluebird.all(roles.map(function (role) {
                return internals._rolesResources(role).then(function (resources) {
                    var roleResource = {};
                    return bluebird.all(resources.map(function (resource) {
                        return internals._resourcePermissions(roles, resource).then(function (p) {
                            roleResource[resource] = p;
                        });
                    })).then(function () {
                        return result[role] = roleResource;
                    });
                });
            })).then(function () {
                return result;
            });
        }
    ).nodeify(cb);
};

//-----------------------------------------------------------------------------
//
// Private methods
//
//-----------------------------------------------------------------------------

//
// Same as allow but accepts a more compact input.
//
internals._allowEx = function (objs) {
    objs = makeArray(objs);

    var demuxed = [];
    objs.forEach(function (obj) {
        var roles = obj.roles;
        obj.allows.forEach(function (allow) {
            demuxed.push({
                roles: roles,
                resources: allow.resources,
                permissions: allow.permissions});
        });
    });

    return bluebird.all(demuxed.map(function (obj) {
        return internals.allow(obj.roles, obj.resources, obj.permissions);
    }));
};

//
// Returns the parents of the given roles
//
internals._rolesParents = function (roles) {
    return backend.unionAsync('parents', roles);
};
//
// Return all roles in the hierarchy including the given roles.
//
internals._allRoles = function (roleNames) {
    return internals._rolesParents(roleNames).then(function (parents) {
        if (parents.length > 0) {
            return internals._allRoles(parents).then(function (parentRoles) {
                return _.union(roleNames, parentRoles);
            });
        } else {
            return roleNames;
        }
    });
};

//
// Returns an array with resources for the given roles.
//
internals._rolesResources = function (roles) {
    roles = makeArray(roles);

    return internals._allRoles(roles).then(function (allRoles) {
        var result = [];

        // check if bluebird.map simplifies this code
        return bluebird.all(allRoles.map(function (role) {
            return backend.getAsync('resources', role).then(function (resources) {
                result = result.concat(resources);
            });
        })).then(function () {
            return result;
        });
    });
};

//
// Returns the permissions for the given resource and set of roles
//
internals._resourcePermissions = function (roles, resource) {
    if (roles.length === 0) {
        return bluebird.resolve([]);
    } else {
        return backend.unionAsync(allowsBucket(resource), roles).then(function (resourcePermissions) {
            return internals._rolesParents(roles).then(function (parents) {
                if (parents && parents.length) {
                    return internals._resourcePermissions(parents, resource).then(function (morePermissions) {
                        return _.union(resourcePermissions, morePermissions);
                    });
                } else {
                    return resourcePermissions;
                }
            });
        });
    }
};

//
// NOTE: This function will not handle circular dependencies and result in a crash.
//
internals._checkPermissions = function (roles, resource, permissions) {

    return backend.unionAsync(allowsBucket(resource), roles).then(function (resourcePermissions) {
        if (resourcePermissions.indexOf('*') !== -1) {
            return true;
        } else {
            permissions = permissions.filter(function (p) {
                return resourcePermissions.indexOf(p) === -1;
            });
            if (permissions.length === 0) {
                return true;
            } else {
                return backend.unionAsync('parents', roles).then(function (parents) {
                    if (parents && parents.length) {
                        return internals._checkPermissions(parents, resource, permissions);
                    } else {
                        return false;
                    }
                });
            }
        }
    });
};

//-----------------------------------------------------------------------------
//
// Helpers
//
//-----------------------------------------------------------------------------

function makeArray(arr) {
    return Array.isArray(arr) ? arr : [arr];
}

function allowsBucket(role) {
    return 'allows_' + role;
}

// -----------------------------------------------------------------------------------

exports.register = function (plugin, options, next) {
    var mongodb_backend = new mongodbBackend(options.db, options.prefix);
    backend = mongodb_backend;

    // Promisify async methods
    mongodb_backend.endAsync = bluebird.promisify(mongodb_backend.end);
    mongodb_backend.getAsync = bluebird.promisify(mongodb_backend.get);
    mongodb_backend.cleanAsync = bluebird.promisify(mongodb_backend.clean);
    mongodb_backend.unionAsync = bluebird.promisify(mongodb_backend.union);

    plugin.expose('addUserRoles', internals.addUserRoles);
    plugin.expose('removeUserRoles', internals.removeUserRoles);
    plugin.expose('userRoles', internals.userRoles);
    plugin.expose('addRoleParents', internals.addRoleParents);
    plugin.expose('removeRole', internals.removeRole);
    plugin.expose('removeResource', internals.removeResource);
    plugin.expose('allow', internals.allow);
    plugin.expose('removeAllow', internals.removeAllow);
    plugin.expose('removePermissions', internals.removePermissions);
    plugin.expose('allowedPermissions', internals.allowedPermissions);
    plugin.expose('isAllowed', internals.isAllowed);
    plugin.expose('areAnyRolesAllowed', internals.areAnyRolesAllowed);
    plugin.expose('whatResources', internals.whatResources);
    plugin.expose('permittedResources', internals.permittedResources);
    plugin.expose('allRoles', internals.allRoles);
    plugin.expose('whatResources', internals.whatResources);
    next();
};


exports.register.attributes = {
    name: 'acl',
    version: '0.0.1'
};
