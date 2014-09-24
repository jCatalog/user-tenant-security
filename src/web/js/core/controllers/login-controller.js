define(['core/core-module', 'coreServices/auth-service'], function (coreModule) {
    'use strict';
    coreModule.controller('LoginController', ['$scope', '$state', '$cookieStore', 'AuthService', function ($scope, $state, $cookieStore, AuthService) {
        $scope.login = function (credentials) {
            AuthService.login(credentials).then(function (user) {
                $cookieStore.put('UserTenantSecurityUserModel', user);
                $state.go('home');
            }, function () {
                console.log('Error');
            });
        };
    }]);
});