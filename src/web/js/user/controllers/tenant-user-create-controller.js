define(['user/user-module', 'tenantServices/tenant-service', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('TenantUserCreateController', ['$scope', '$state', '$stateParams', 'TenantService', 'UserService', function ($scope, $state, $stateParams, TenantService, UserService) {
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
            $state.go('user.tenant', {id: $stateParams.id});
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
                    $scope.addAlert({type: 'success', msg: data.userId + ' is created successfully' });
                }, function (err) {
                    $scope.addAlert({type: 'danger', msg: 'User creation is failed for ' + err.data.message});
                });
            }
        };
    }]);
});
