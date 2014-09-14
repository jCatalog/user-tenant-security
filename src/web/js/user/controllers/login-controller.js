define(['user/user-module', 'userServices/auth-service'], function (userModule) {
    'use strict';
    userModule.controller('LoginController', ['$scope', 'AuthService', function ($scope, AuthService) {
        $scope.credentials = {
            username: '',
            password: ''
        };
        $scope.login = function (credentials) {
            AuthService.login(credentials).then(function (user) {
                //$scope.setCurrentUser(user);
                console.log('Login');
            }, function () {
                console.log('Error');
            });
        };
    }]);
});
