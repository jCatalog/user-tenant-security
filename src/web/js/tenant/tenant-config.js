define(['tenant/tenant-module',
    'tenantControllers/tenant-controller',
    'tenantControllers/tenant-list-controller',
    'tenantControllers/tenant-create-controller',
    'tenantControllers/tenant-detail-controller',
    'tenantControllers/tenant-edit-controller'
], function (tenantModule) {
    'use strict';
    return tenantModule.config([function () {}]);
});