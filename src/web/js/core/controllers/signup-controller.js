define(['core/core-module', 'userServices/user-service', 'coreDirectives/password-match'], function (coreModule) {
    'use strict';
    coreModule.controller('SignupFormController', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
        $scope.isCollapsed = true;
        $scope.signup = function (user) {
            UserService.save(user, function (data) {
                $scope.authError = null;
                $scope.isCollapsed = false;
            }, function (err) {
                $scope.authError = err.data.message;
                $scope.isCollapsed = true;
            });
        };
    }]);
});