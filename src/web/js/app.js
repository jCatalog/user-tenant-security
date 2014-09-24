define([
    'angular',
    'angularRoute',
    'angularUiRouter',
    'angularHttpAuth',
    'core/core-module',
    'core/core-config',
    'tenant/tenant-module',
    'tenant/tenant-config',
    'user/user-module',
    'user/user-config',
    'role/role-module',
    'role/role-config'
], function (angular) {
    'use strict';

    return angular.module('app', ['coreModule', 'tenantModule', 'roleModule', 'userModule', 'ngRoute', 'ui.router', 'http-auth-interceptor']).run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('event:auth-loginRequired', function () {
            $location.path('/signin');
            console.log('event:auth-login required  ...');
        });
        console.log('app module running...');
    }]);
});