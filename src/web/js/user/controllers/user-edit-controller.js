define(['user/user-module', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('UserEditController', ['$scope', '$stateParams', 'UserService', function ($scope, $stateParams, UserService) {
        $scope.user = {};
        $scope.userId = $stateParams.id;
        (function () {
            UserService.get({id: $scope.userId}, function (user) {
                console.log(user);
                $scope.user = user;
            });
        })();

        $scope.updateUser = function (user) {
            UserService.update(user, function (result) {
                $scope.user = result.data;
                $scope.addAlert({type: 'success', msg: result.data.userId + ' is updated successfully' });
            }, function (err) {
                $scope.addAlert({type: 'danger', msg: 'User update is failed for ' + err.data.message});
            });
        };
    }]);
});
