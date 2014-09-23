define(['tenant/tenant-module','tenantServices/tenant-service'], function (tenantModule) {
    'use strict';
    tenantModule.controller('TenantListController', ['$scope', '$timeout', 'ngTableParams', 'TenantService', function ($scope, $timeout, NgTableParams, TenantService) {
        console.log('Tenant List Controller running........');
        $scope.getCSVFileName =function(){
            return 'test_download.csv';
        };

        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: 0,
            getData: function ($defer, params) {
                // ajax request to api
                TenantService.query(params.url(),function (data) {
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