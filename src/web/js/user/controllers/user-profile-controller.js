define(['user/user-module', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('UserProfileController', ['$scope', '$state', '$stateParams', 'UserService', '$cookieStore', '$location', function ($scope, $state, $stateParams, UserService, $cookieStore, $location) {

        $scope.cancel = function () {
            $location.path('/');
        };

        (function () {
                var userModel = $cookieStore.get('UserTenantSecurityUserModel');
                UserService.get({id: userModel.userId}, function (user) {
                $scope.user = user;
            });
        })();

        $scope.updateProfile = function (user) {
            UserService.update(user, function (result) {
                $scope.user = result.data;
                var cookieData = {
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    userId: result.data._id,
                    username: result.data.username
                };
                $cookieStore.put('UserTenantSecurityUserModel', cookieData);
                $scope.userFullName = user.firstName + ' ' + user.lastName;
                //$scope.addAlert({type: 'success', msg: result.data.username + ' is updated successfully' });
                $location.path('/');
            }, function (err) {
                $scope.addAlert({type: 'danger', msg: 'User update is failed for ' + err.data.message});
            });
        };
    }]);
});
