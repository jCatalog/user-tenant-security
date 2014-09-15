define(['user/user-module', 'userServices/auth-service'], function (userModule) {
    'use strict';
    userModule.controller('LoginController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
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
