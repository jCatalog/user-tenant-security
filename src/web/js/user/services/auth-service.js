define(['user/user-module'], function (userModule) {
    'use strict';

    userModule.service('AuthService', function ($http) {
        this.login = function (credentials) {
            console.log('Auth Service');
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    return res.data.user;
                });
        };
    });
});