define(['user/user-module', 'userServices/user-service', 'coreServices/modal-service'], function (userModule) {
    'use strict';
    userModule.controller('UserController', ['$scope', '$state', 'UserService', 'ModalService', function ($scope, $state, UserService, ModalService) {
        console.log('User Controller running........');
        $scope.editUser = function (userId) {
            console.log('Edit user');
            $state.go('user.edit', { id: userId });
        };

        $scope.createNewUser = function(){
            $state.go('user.create');
        };

        $scope.downloadUserCSVFile = function(){
            console.log('Download CSV file');
        };
    }]);
});
