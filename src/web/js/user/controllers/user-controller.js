define(['user/user-module', 'userServices/user-service', 'coreServices/modal-service'], function (userModule) {
    'use strict';
    userModule.controller('UserController', ['$scope', '$state', 'UserService', 'ModalService', function ($scope, $state, UserService, ModalService) {
        $scope.downloadUserCSVFile = function(){
            console.log('Download CSV file');
        };
    }]);
});
