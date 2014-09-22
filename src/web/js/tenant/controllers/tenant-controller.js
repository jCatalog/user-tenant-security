define(['tenant/tenant-module'], function (tenantModule) {
    'use strict';
    tenantModule.controller('TenantController', ['$scope','$state', function ($scope, $state) {
        $scope.createNewTenant = function(){
            $state.go('tenant.create');
        };

        $scope.downloadTenantCSVFile = function(){
            console.log('Download CSV file');
        };
    }]);
});
