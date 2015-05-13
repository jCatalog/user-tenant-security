define(['tenant/tenant-module', 'tenantServices/tenant-service'], function (tenantModule) {
    'use strict';
    tenantModule.controller('TenantListController', ['$scope', '$state', '$timeout', 'ngTableParams', 'TenantService', function ($scope, $state, $timeout, NgTableParams, TenantService) {
        console.log('Tenant List Controller running........');
        $scope.getCSVFileName = function () {
            return 'test_download.csv';
        };

        var preSelection = null;
        $scope.select = function (tenant) {
            if (preSelection)
                preSelection.$selected = false;
            tenant.$selected = true;
            preSelection= tenant;
        };

        // $scope.showTenantUsers = function(tenantId){
        //     //$state.go('user.tenant', { id: tenantId });
        // };

        $scope.showTenant = function(tenantId) {
            $state.go('tenant.edit', { id: tenantId});
        }

        $scope.tenantGrid = new NgTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: 0,
            getData: function ($defer, params) {
                // ajax request to api
                TenantService.query(params.url(), function (data) {
                    $timeout(function () {
                        // update table params
                        params.total(data.total);
                        // set new data
                        $defer.resolve(data.tenants);
                    }, 500);
                });
            }
        });
    }]);
});