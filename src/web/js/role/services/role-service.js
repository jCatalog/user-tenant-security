define(['role/role-module'], function (roleModule) {
    'use strict';

    roleModule.factory('RoleService', ['$resource',
        function ($resource) {
            return $resource('roles/:id', { id: '@_id'
            }, {
                query: { method: 'GET', isArray: false },
                update: { method: 'PUT' }
            });
        }
    ]);
});