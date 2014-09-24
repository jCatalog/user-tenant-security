define(['core/core-module', 'coreServices/auth-service'], function (coreModule) {
    'use strict';
    coreModule.controller('ContainerController', ['$scope', '$state', '$cookieStore', 'AuthService', function ($scope, $state, $cookieStore, AuthService) {
        $scope.userModel = $cookieStore.get('UserTenantSecurityUserModel');
        if (!$scope.userModel) {
            $state.go('signin');
        }

        $scope.logout = function () {
            AuthService.logout().then(function (data) {
                $state.go('signin');
            }, function () {
                console.log('Error');
            });
        };

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.addAlert = function (alert) {
            $scope.alerts[0] = alert;
        };
    }]);
});