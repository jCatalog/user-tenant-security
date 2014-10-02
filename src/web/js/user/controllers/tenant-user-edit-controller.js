define(['user/user-module', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('TenantUserEditController', ['$scope', '$state', '$stateParams', 'UserService', function ($scope, $state, $stateParams, UserService) {
        $scope.user = {};
        $scope.userId = $stateParams.id;
        $scope.tenantId = $stateParams.tenantId;
        $scope.cancel = function () {
            $state.go('user.tenant', {id: $scope.tenantId});
        };

        (function () {
            UserService.get({id: $scope.userId, tenantId: $scope.tenantId}, function (user) {
                $scope.user = user;
            });
        })();

        $scope.updateUser = function (user) {
            UserService.update(user, function (result) {
                $scope.user = result.data;
                $scope.addAlert({type: 'success', msg: result.data.userId + ' is updated successfully' });
            }, function (err) {
                $scope.addAlert({type: 'danger', msg: 'User update is failed for ' + err.data.message});
            });
        };
    }]);
});
