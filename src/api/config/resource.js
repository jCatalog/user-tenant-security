'use strict';

var resourceList =
{
    tenant: {
        name: 'tenants',
        action: ['add', 'delete', 'edit', 'list', 'view']
    },
    user: {
        name: 'users',
        action: ['add', 'delete', 'edit', 'list', 'view']
    },
    role: {
        name: 'roles',
        action: ['add', 'delete', 'edit', 'list', 'view']
    }
};

module.exports = resourceList;