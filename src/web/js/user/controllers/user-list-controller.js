define(['user/user-module', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('UserListController', ['$scope', 'ngTableParams', 'UserService', function ($scope, NgTableParams, UserService) {
        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: 0,
            getData: function ($defer) {
                // ajax request to api
                UserService.query(function (data) {
                    $defer.resolve(data);
                });
            }
        });
    }]);
});
