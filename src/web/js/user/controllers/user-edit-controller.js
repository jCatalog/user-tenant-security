define(['user/user-module', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('UserEditController', ['$scope','$stateParams', 'UserService', function ($scope, $stateParams, UserService) {
        $scope.user ={};
        $scope.userId = $stateParams.id;
        (function(){
            UserService.get({id:$scope.userId}, function(user){
                console.log(user);
                $scope.user = user;
            });
        })();
    }]);
});
