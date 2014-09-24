define(['core/core-module', 'userServices/user-service', 'coreDirectives/password-match'], function (coreModule) {
    'use strict';
    coreModule.controller('SignupFormController', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
        $scope.signup = function (user) {
            UserService.save(user, function (data) {
                $state.go('signin');
            }, function () {
                console.log('Error');
            });
        };
    }]);
});