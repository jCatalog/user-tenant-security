define([
    'angular',
    'angularRoute',
    'angularHttpAuth',
    'user/user-module',
    'user/user-config',
    'ng-table-export'
], function (angular) {
    'use strict';

    return angular.module('app', ['ngRoute', 'http-auth-interceptor', 'ngTableExport', 'userModule']).run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('event:auth-loginRequired', function() {
            $location.path('/login');
            console.log('event:auth-login required  ...');
        });
        console.log('app module running...');
    }]);
});