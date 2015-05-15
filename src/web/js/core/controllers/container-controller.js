define(['core/core-module', 'coreServices/auth-service'], function (coreModule) {
    'use strict';
    coreModule.controller('ContainerController', ['$scope', '$state', '$cookieStore', 'AuthService', '$location', function ($scope, $state, $cookieStore, AuthService, $location) {
        var userModel = $cookieStore.get('UserTenantSecurityUserModel');
        if(!userModel || userModel === 'undefined')
        {
            $location.path('/signin')
        }
        else
        {
            $scope.userFullName = userModel.firstName + ' ' + userModel.lastName;
        }

        $scope.logout = function () {
            AuthService.logout().then(function (data) {
                $cookieStore.remove('UserTenantSecurityUserModel');
                $location.path('/signin')
            }, function () {
                console.log('Error');
            });
        };

        $scope.viewAccount = function() {
            var userModel = $cookieStore.get('UserTenantSecurityUserModel');
            $state.go('user.profile', { param: userModel.username });
        };

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.addAlert = function (alert) {
            $scope.alerts[0] = alert;
        };

        $scope.init = function()
        {
            var userModel = $cookieStore.get('UserTenantSecurityUserModel');
            if(!userModel || userModel === 'undefined')
            {
                $location.path('/signin')
            }
            else
            {
                $scope.userFullName = userModel.firstName + ' ' + userModel.lastName;
            }
        }
    }]);
});