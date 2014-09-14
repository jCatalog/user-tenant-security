define([
    'angular',
    'angularRoute',
    'user/user-module',
    'user/user-config'
], function (angular) {
    'use strict';

    return angular.module('app', ['ngRoute', 'userModule']).run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (AuthService.isAuthenticated()) $location.path('/');
            else $location.path('/login');
        });
        console.log('app module running...');
    }]);
});