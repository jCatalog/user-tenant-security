define(['core/core-module', 'coreServices/auth-service'], function (coreModule) {
    'use strict';
    coreModule.controller('LoginController', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
        $scope.login = function (credentials) {
            AuthService.login(credentials).then(function (user) {
                console.log('Login');
                $state.go('home');
            }, function () {
                console.log('Error');
            });
        };
    }]);
});