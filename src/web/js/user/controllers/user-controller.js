define(['user/user-module'], function (userModule) {
    'use strict';
    userModule.controller('UserController', ['$scope', function ($scope) {
        console.log('User Controller running........');
    }]);
});
