define(['core/core-module', 'coreServices/auth-service'], function (coreModule) {
    'use strict';
    coreModule.controller('LoginController', ['$scope', '$rootScope', '$state', '$cookieStore', 'AuthService', function ($scope, $rootScope, $state, $cookieStore, AuthService) {
        $scope.login = function (credentials) {
            AuthService.login(credentials).then(function (user) {
                $cookieStore.put('UserTenantSecurityUserModel', user);
                $scope.userFullName = user.firstName + ' ' + user.lastName;
                $state.go('home');
            }, function (err) {
                $scope.authError = err.data.message;
            });
        };
    }]);
});