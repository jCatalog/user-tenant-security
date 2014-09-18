'use strict';

define(['angular','app'],
    function (angular, app) {
        return app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/tenant/list');

            $stateProvider
                .state('tenant', {
                    url: '/tenant',
                    templateUrl: '',
                    controller: 'TenantController',
                    abstract: true
                }).state('tenant.list', {
                    url: '/list',
                    templateUrl: 'partials/tenant/tenant-list.html',
                    controller: 'TenantListController',
                    parent: 'tenant'
                }).state('tenant.detail', {
                    url: '/detail/:id',
                    templateUrl: 'partials/tenant/tenant-detail.html',
                    controller: 'TenantDetailController',
                    parent: 'tenant'
                }).state('tenant.create', {
                    url: '/create',
                    templateUrl: 'partials/tenant/tenant-create.html',
                    controller: 'TenantCreateController',
                    parent: 'tenant'
                }).state('tenant.edit', {
                    url: '/edit/:id',
                    templateUrl: 'partials/tenant/tenant-edit.html',
                    controller: 'TenantEditController',
                    parent: 'tenant'
                }).state('user', {
                    url: '/user',
                    templateUrl: '',
                    controller: 'UserController'
                }).state('user.list', {
                    url: '/list',
                    templateUrl: 'partials/user/user-list.html',
                    controller: 'UserListController',
                    parent: 'user'
                }).state('user.detail', {
                    url: '/detail/:id',
                    templateUrl: 'partials/user/user-detail.html',
                    controller: 'UserDetailController',
                    parent: 'user'
                }).state('user.create', {
                    url: '/create',
                    templateUrl: 'partials/user/user-create.html',
                    controller: 'UserCreateController',
                    parent: 'user'
                }).state('user.edit', {
                    url: '/edit/:id',
                    templateUrl: 'partials/user/user-edit.html',
                    controller: 'UserEditController',
                    parent: 'user'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'partials/login.html',
                    controller: 'LoginController'
                });
        }]);
    });