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

    return angular.module('app', ['coreModule', 'tenantModule', 'roleModule', 'userModule', 'ngRoute', 'ui.router', 'http-auth-interceptor'])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('event:auth-loginRequired', function () {
            $state.go('signin');
            console.log('event:auth-login required  ...');
        });
        $rootScope.$on('event:auth-forbidden', function () {
            $state.go('home');
            console.log('event:auth-forbidden  ...');
        });
    }]);
});