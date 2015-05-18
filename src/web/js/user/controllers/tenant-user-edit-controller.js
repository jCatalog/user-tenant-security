define(['user/user-module', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('TenantUserEditController', ['$scope', '$state', '$stateParams', 'UserService', 'growl', function ($scope, $state, $stateParams, UserService, growl) {
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
                growl.addSuccessMessage(result.data.userId + ' is updated successfully')
            }, function (err) {
                growl.addErrorMessage('User update is failed for ' + err.data.message);
            });
        };
    }]);
});
