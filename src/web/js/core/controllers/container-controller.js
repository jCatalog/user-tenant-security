define(['core/core-module', 'coreServices/auth-service'], function (coreModule) {
    'use strict';
    coreModule.controller('ContainerController', ['$scope', '$state', '$cookieStore', 'AuthService', function ($scope, $state, $cookieStore, AuthService) {
        var userModel = $cookieStore.get('UserTenantSecurityUserModel');
        if (!userModel) {
            $state.go('signin');
        } else {
            $scope.userFullName = userModel.firstName + ' ' + userModel.lastName;
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