define(['user/user-module', 'userServices/session-service'], function (userModule) {
    'use strict';

    userModule.factory('AuthService', function ($http, SessionService) {
        var authService = {};

        authService.login = function (credentials) {
            console.log('Auth Service');
//            return $http
//                .post('/login', credentials)
//                .then(function (res) {
//                    SessionService.create(res.data.id, res.data.user.id,
//                        res.data.user.role);
//                    return res.data.user;
//                });
        };

//        authService.isAuthenticated = function () {
//            return !!SessionService.userId;
//        };
//
//        authService.isAuthorized = function (authorizedRoles) {
//            if (!angular.isArray(authorizedRoles)) {
//                authorizedRoles = [authorizedRoles];
//            }
//            return (authService.isAuthenticated() &&
//                authorizedRoles.indexOf(SessionService.userRole) !== -1);
//        };

        return authService;
    });
});