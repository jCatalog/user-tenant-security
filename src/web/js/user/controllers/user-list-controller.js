define(['user/user-module', 'userServices/user-service', 'userServices/modal-service'], function (userModule) {
    'use strict';
    userModule.controller('UserListController', ['$scope', '$timeout', 'ngTableParams', 'UserService', 'modalService', function ($scope, $timeout, NgTableParams, UserService, modalService) {
        $scope.getCSVFileName =function(){
            return 'test_download.csv';
        };

        $scope.showEditDialog = function(userId){
            modalService.open();
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
                        $defer.resolve(data.users);
                    }, 500);
                });
            }
        });
    }]);
});
