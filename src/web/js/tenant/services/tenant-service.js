define(['tenant/tenant-module'], function (tenantModule) {
    'use strict';

    tenantModule.factory('TenantService', ['$resource',
        function ($resource) {
            return $resource('tenants/:id', { id: '@_id'
            }, {
                query: { method: 'GET', isArray: false },
                update: { method: 'PUT' }
            });
        }
    ]);
});