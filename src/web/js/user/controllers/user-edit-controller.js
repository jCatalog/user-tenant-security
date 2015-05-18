define(['user/user-module', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('UserEditController', ['$scope', '$state', '$stateParams', 'UserService', 'growl', function ($scope, $state, $stateParams, UserService, growl) {
        $scope.user = {};
        $scope.userId = $stateParams.id;
        $scope.cancel = function () {
            $state.go('user.list');
        };

        (function () {
            UserService.get({id: $scope.userId}).$promise.then(function(user){
                $scope.user = user;
            })
                
        })();

        $scope.updateUser = function (user) {
            UserService.update(user, function (result) {
                $scope.user = result.data;
                growl.addSuccessMessage(result.data.username + ' is updated successfully' );
            }, function (err) {
                growl.addErrorMessage('User update is failed for ' + err.data.message);
            });
        };
    }]);
});
