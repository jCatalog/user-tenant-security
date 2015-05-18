define(['tenant/tenant-module', 'tenantServices/tenant-service'], function (tenantModule) {
    'use strict';
    tenantModule.controller('TenantCreateController', ['$scope', 'TenantService', 'growl', function ($scope, TenantService, growl) {
        $scope.createTenant = function (tenant) {
            TenantService.save(tenant, function (data) {
                growl.addSuccessMessage(data.tenantId + ' is created successfully' );
            }, function (err) {
                growl.addErrorMessage('Tenant creation is failed for ' + err.data.message);
            });
        };
    }]);
});
