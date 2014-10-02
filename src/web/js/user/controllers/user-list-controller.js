define(['user/user-module', 'userServices/user-service', 'coreServices/modal-service'], function (userModule) {
    'use strict';
    userModule.controller('UserListController', ['$scope','$state', '$timeout', 'ngTableParams', 'UserService', 'ModalService', function ($scope, $state,$timeout, NgTableParams, UserService, ModalService) {
        $scope.getCSVFileName = function () {
            return 'test_download.csv';
        };

        $scope.editUser = function (userId) {
            $state.go('user.edit', { id: userId });
        };

        $scope.createNewUser = function(){
            $state.go('user.create');
        };

        $scope.deleteUser = function (userId) {
            ModalService.showConfirmModal({title: 'Delete User', message: 'Do you really want to remove the user?'}, function () {
                UserService.delete({id: userId}, function () {
                    $scope.alerts.push({type: 'success', msg: 'User is deleted successfully' });
                    $scope.userGrid.reload();
                }, function (err) {
                    $scope.alerts.push({type: 'danger', msg: 'User deletion is failed for ' + err.data.message});
                });
            });
        };

        var preSelection = null;
        $scope.select = function (user) {
            if (preSelection)
                preSelection.$selected = false;
            user.$selected = true;
            preSelection = user;
        };

        $scope.userGrid = new NgTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: 0,
            getData: function ($defer, params) {
                // ajax request to api
                UserService.query(params.url(), function (data) {
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
