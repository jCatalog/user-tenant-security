define(['user/user-module', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('UserController', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
        console.log('User Controller running........');
        $scope.editUser = function (userId) {
            console.log('Edit user');
            $state.go('user.edit', { id: userId });
        };

        $scope.deleteUser = function (userId) {
            console.log('Delete user');
            UserService.delete({id: userId}, function(data){
                console.log('Deleted');
            });
        };
    }]);
});
