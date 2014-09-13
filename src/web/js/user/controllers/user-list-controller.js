define(['user/user-module', 'userServices/user-list-service'], function (userModule) {
    'use strict';
    userModule.controller('UserListController', ['$scope', 'ngTableParams', 'Users', function ($scope, NgTableParams, Users) {
        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: 0,
            getData: function ($defer) {
                // ajax request to api
                Users.query(function (data) {
                    $defer.resolve(data);
                });
            }
        });
    }]);
});
