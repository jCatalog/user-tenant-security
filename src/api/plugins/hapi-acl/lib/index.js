'use strict';

// Declare internals
var acl = require('./acl');
var mongodbBackend = require('./mongodb-backend');

exports.register = function (plugin, options, next) {
    var Acl = new acl(new mongodbBackend(options.db, options.prefix));
    plugin.expose('addUserRoles', Acl.addUserRoles);
    plugin.expose('removeUserRoles', Acl.removeUserRoles);
    plugin.expose('userRoles', Acl.userRoles);
    plugin.expose('addRoleParents', Acl.addRoleParents);
    plugin.expose('removeRole', Acl.removeRole);
    plugin.expose('removeResource', Acl.removeResource);
    plugin.expose('allow', Acl.allow);
    plugin.expose('removeAllow', Acl.removeAllow);
    plugin.expose('removePermissions', Acl.removePermissions);
    plugin.expose('allowedPermissions', Acl.allowedPermissions);
    plugin.expose('isAllowed', Acl.isAllowed);
    plugin.expose('areAnyRolesAllowed', Acl.areAnyRolesAllowed);
    plugin.expose('whatResources', Acl.whatResources);
    plugin.expose('permittedResources', Acl.permittedResources);
    plugin.expose('allRoles', Acl.allRoles);
    plugin.expose('whatResources', Acl.whatResources);
    next();
};


exports.register.attributes = {
    name: 'acl',
    version: '0.0.1'
};
