define([
    'angular',
    'angularRoute',
    'angularHttpAuth',
    'tenant/tenant-module',
    'tenant/tenant-config',
    'user/user-module',
    'user/user-config'
], function (angular) {
    'use strict';

    return angular.module('app', ['appServiceModule', 'tenantModule', 'userModule', 'ngRoute', 'http-auth-interceptor']).run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('event:auth-loginRequired', function () {
            $location.path('/login');
            console.log('event:auth-login required  ...');
        });
        console.log('app module running...');
    }]);
});