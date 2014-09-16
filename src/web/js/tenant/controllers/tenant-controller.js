define(['tenant/tenant-module', 'tenantServices/tenant-service', 'tenantServices/modal-service'], function (tenantModule) {
    'use strict';
    tenantModule.controller('TenantController', ['$scope', '$timeout', 'ngTableParams', 'TenantService', 'ModalService', function ($scope, $timeout, NgTableParams, TenantService, ModalService) {
        $scope.getCSVFileName =function(){
            return 'test_download.csv';
        };

        $scope.showEditDialog = function(tenantId){
            ModalService.form();
        };

        $scope.showConfirmDialog = function(tenantId){
            ModalService.confirm();
        };

        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: 0,
            getData: function ($defer, params) {
                // ajax request to api
                UserService.query(params.url(),function (data) {
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
