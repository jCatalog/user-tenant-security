define(['user/user-module', 'userServices/user-service', 'coreServices/modal-service'], function (userModule) {
    'use strict';
    userModule.controller('UserController', ['$scope', '$state', 'UserService', 'ModalService', function ($scope, $state, UserService, ModalService) {
        console.log('User Controller running........');
        $scope.editUser = function (userId) {
            console.log('Edit user');
            $state.go('user.edit', { id: userId });
        };

        $scope.deleteUser = function (userId) {
            ModalService.showConfirmModal({title: 'Delete User', message: 'Do you really want to remove the user?'}, function(){
                UserService.delete({id: userId}, function (data) {
                });
            });
        };
    }]);
});
