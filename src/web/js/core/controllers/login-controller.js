define(['core/core-module', 'coreServices/auth-service'], function (coreModule) {
    'use strict';
    coreModule.controller('LoginController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
        $scope.login = function (credentials) {
            AuthService.login(credentials).then(function (user) {
                console.log('Login');
                $location.path('/');
            }, function () {
                console.log('Error');
            });
        };
    }]);
});