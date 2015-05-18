define(['user/user-module', 'tenantServices/tenant-service', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('TenantUserCreateController', ['$scope', '$state', '$stateParams', 'TenantService', 'UserService', 'growl', function ($scope, $state, $stateParams, TenantService, UserService, growl) {
        console.log('User Create Controller running........');
        $scope.tenants = [];
        $scope.tenantId = $stateParams.id;
        (function () {
            TenantService.get({id: $scope.tenantId}, function (data) {
                $scope.tenants.push(data);
                $scope.selectedTenant = data;
            });
        })();

        $scope.cancel = function () {
            $state.go('user.tenant', {id: $scope.tenantId});
        };

        $scope.createUser = function (data) {
            if (data) {
                var user = {};
                user.userId = data.userId;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.password = data.password;
                user.tenantId = $scope.selectedTenant._id;
                UserService.save(user, function (data) {
                    growl.addSuccessMessage(data.userId + ' is created successfully');
                }, function (err) {
                    growl.addErrorMessage('User creation is failed for ' + err.data.message);
                });
            }
        };
    }]);
});
