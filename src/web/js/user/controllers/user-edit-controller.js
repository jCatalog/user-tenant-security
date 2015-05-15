define(['user/user-module', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('UserEditController', ['$scope', '$state', '$stateParams', 'UserService', function ($scope, $state, $stateParams, UserService) {
        $scope.user = {};
        $scope.userId = $stateParams.id;
        $scope.cancel = function () {
            $state.go('user.list');
        };

        (function () {
            UserService.get({id: $scope.userId}, function (user) {
                $scope.user = user;
            });
        })();

        $scope.updateUser = function (user) {
            UserService.update(user, function (result) {
                $scope.user = result.data;
                $scope.addAlert({type: 'success', msg: result.data.username + ' is updated successfully' });
            }, function (err) {
                $scope.addAlert({type: 'danger', msg: 'User update is failed for ' + err.data.message});
            });
        };
    }]);
});
