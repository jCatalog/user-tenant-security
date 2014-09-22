define(['core/core-module', 'coreServices/auth-service'], function (coreModule) {
    'use strict';
    coreModule.controller('ContainerController', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
        $scope.logout = function () {
            AuthService.logout().then(function (data) {
                $state.go('login');
            }, function () {
                console.log('Error');
            });
        };

        $scope.alerts = [];
        $scope.closeAlert = function(index){
            $scope.alerts.splice(index, 1);
        };
    }]);
});