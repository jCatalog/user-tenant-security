'use strict'

var Acl = function (backend) {
    this.backend = backend;
};

Acl.prototype.addUserRoles = function (userId, roles, cb) {
    return this.backend.add('users', {'userId': userId}, roles, cb);
};

Acl.prototype.removeUserRoles = function (userId, roles, cb) {
    return this.backend.remove('users', {'userId': userId}, roles, cb);
};
Acl.prototype.userRoles = function (userId, cb) {
};
Acl.prototype.hasRole = function (userId, rolename, cb) {
};
Acl.prototype.addRoleParents = function (role, parents, cb) {
};
Acl.prototype.removeRole = function (role, cb) {
};
Acl.prototype.removeResource = function (resource, cb) {
};
Acl.prototype.allow = function (roles, resources, permissions, cb) {
};
Acl.prototype.removeAllow = function (role, resources, permissions, cb) {
};
Acl.prototype.removePermissions = function (role, resources, permissions, cb) {
};
Acl.prototype.allowedPermissions = function (userId, resources, cb) {
};
Acl.prototype.isAllowed = function (userId, resource, permissions, cb) {
};
Acl.prototype.areAnyRolesAllowed = function (roles, resource, permissions, cb) {
};
Acl.prototype.whatResources = function (roles, permissions, cb) {
};
Acl.prototype.permittedResources = function (roles, permissions, cb) {
};

exports = module.exports = Acl;