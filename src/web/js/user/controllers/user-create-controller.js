define(['user/user-module', 'tenantServices/tenant-service', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('UserCreateController', ['$scope', '$state', 'TenantService', 'UserService', 'growl', function ($scope, $state, TenantService, UserService, growl) {
        console.log('User Create Controller running........');
        $scope.tenants = [];
        (function () {
            TenantService.query({}, function (data) {
                $scope.tenants = data.tenants;
                if (data.tenants)
                    $scope.selectedTenant = data.tenants[0];
            });
        })();

        $scope.cancel = function () {
            $state.go('user.list');
        };

        $scope.createUser = function (data) {
            if (data) {
                var user = {};
                user.username = data.username;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.password = data.password;
                user.tenantId = $scope.selectedTenant._id;
                UserService.save(user, function (data) {
                    growl.addSuccessMessage('User Created Successfully')
                    $state.go('user.list');
                }, function (err) {
                    growl.addErrorMessage('User creation is failed for ' + err.data.message)
                });
            }
        };
    }]);
});
