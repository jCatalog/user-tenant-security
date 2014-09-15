define(['user/user-module', 'userServices/session-service'], function (userModule) {
    'use strict';

    userModule.service('AuthService', function ($http, SessionService) {
        this.login = function (credentials) {
            console.log('Auth Service');
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    SessionService.create(res.data.user.username);
                    return res.data.user;
                });
        };

        this.isAuthenticated = function () {
            return !!SessionService.username;
        };
    });
});