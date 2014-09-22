define(['tenant/tenant-module', 'tenantServices/tenant-service'], function (tenantModule) {
    'use strict';
    tenantModule.controller('TenantCreateController', ['$scope', 'TenantService', function ($scope, TenantService) {
        $scope.createTenant = function (tenant) {
            TenantService.save(tenant, function (data) {
                $scope.alerts.push({type: 'success', msg: data.tenantId + ' is created successfully' });
            }, function (err) {
                $scope.alerts.push({type: 'danger', msg: 'Tenant creation is failed for ' + err.data.message});
            });
        };
    }]);
});
