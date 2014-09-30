define(['core/core-module', 'coreServices/auth-service', 'coreDirectives/password-match'], function (coreModule) {
    'use strict';
    coreModule.controller('SignupFormController', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
        $scope.isCollapsed = true;
        $scope.signup = function (user) {
            AuthService.signup(user).then(function (data) {
                $scope.authError = null;
                $scope.isCollapsed = false;
            }, function (err) {
                $scope.authError = err.data.message;
                $scope.isCollapsed = true;
            });
        };
    }]);
});