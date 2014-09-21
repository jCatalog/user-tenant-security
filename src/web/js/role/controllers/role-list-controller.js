define(['role/role-module','roleServices/role-service'], function (roleModule) {
    'use strict';
    roleModule.controller('RoleListController', ['$scope', '$timeout', 'ngTableParams', 'RoleService', function ($scope, $timeout, NgTableParams, RoleService) {
        console.log('Role List Controller running........');

        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: 0,
            getData: function ($defer, params) {
                // ajax request to api
                RoleService.query(params.url(),function (data) {
                    $timeout(function () {
                        // update table params
                        params.total(data.total);
                        // set new data
                        $defer.resolve(data.users);
                    }, 500);
                });
            }
        });
    }]);
});