define(['core/core-module'], function (coreModule) {
    'use strict';
    coreModule.service('AuthService', function ($http) {
        this.login = function (credentials) {
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    return res.data.user;
                });
        };
        this.signup = function (credentials) {
            return $http
                .post('/signup', credentials)
                .then(function (res) {
                    return res.data.user;
                });
        };
        this.logout = function () {
            return $http
                .post('/logout')
                .then(function (res) {
                    return res.data;
                });
        };
    });
});