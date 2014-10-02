define(['user/user-module', 'userServices/user-service', 'coreServices/modal-service'], function (userModule) {
    'use strict';
    userModule.controller('TenantUserListController', ['$scope', '$state', '$stateParams', '$timeout', 'ngTableParams', 'UserService', 'ModalService', function ($scope, $state, $stateParams, $timeout, NgTableParams, UserService, ModalService) {
        $scope.getCSVFileName = function () {
            return 'test_download.csv';
        };
        $scope.tenantId = $stateParams.id;
        $scope.back = function () {
            $state.go('tenant.list');
        };
        $scope.createNewUser = function () {
            $state.go('user.tenant.create', {id: $scope.tenantId});
        };

        $scope.editUser = function (userId) {
            $state.go('user.tenant.edit', {tenantId: $scope.tenantId, id: userId});
        };

        $scope.deleteUser = function (userId) {
            ModalService.showConfirmModal({title: 'Delete User', message: 'Do you really want to remove the user?'}, function () {
                UserService.delete({id: userId}, function () {
                    $scope.alerts.push({type: 'success', msg: 'User is deleted successfully' });
                    $scope.tableParams.reload();
                }, function (err) {
                    $scope.alerts.push({type: 'danger', msg: 'User deletion is failed for ' + err.data.message});
                });
            });
        };
        $scope.userGrid = new NgTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: 0,
            getData: function ($defer, params) {
                params.$params.filter = {'tenantId': $scope.tenantId};
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