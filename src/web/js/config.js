'use strict';

define(['angular', 'app'],
    function (angular, app) {
        return app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('role', {
                    url: '/role',
                    templateUrl: 'partials/core/container.html',
                    controller: 'RoleController',
                    abstract: true
                }).state('role.list', {
                    url: '/list',
                    templateUrl: 'partials/role/role-list.html',
                    controller: 'RoleListController',
                    parent: 'role'
                }).state('role.detail', {
                    url: '/detail/:id',
                    templateUrl: 'partials/role/role-detail.html',
                    controller: 'RoleDetailController',
                    parent: 'role'
                }).state('role.create', {
                    url: '/create',
                    templateUrl: 'partials/role/role-create.html',
                    controller: 'RoleCreateController',
                    parent: 'role'
                }).state('role.edit', {
                    url: '/edit/:id',
                    templateUrl: 'partials/role/role-edit.html',
                    controller: 'RoleEditController',
                    parent: 'role'
                }).state('tenant', {
                    url: '/tenant',
                    templateUrl: 'partials/core/container.html',
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
                })
                .state('user', {
                    url: '/user',
                    templateUrl: 'partials/core/container.html',
                    controller: 'UserController'
                }).state('user.list', {
                    url: '/list',
                    templateUrl: 'partials/user/user-list.html',
                    controller: 'UserListController',
                    parent: 'user'
                })
                .state('user.tenant.edit', {
                    url: '/tenant/:tenantId/edit/:id',
                    templateUrl: 'partials/user/user-edit.html',
                    controller: 'TenantUserEditController',
                    parent: 'user'
                }).state('user.tenant.create', {
                    url: '/tenant/:id/create',
                    templateUrl: 'partials/user/user-create.html',
                    controller: 'TenantUserCreateController',
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
                }).state('signin', {
                    url: '/signin',
                    templateUrl: 'partials/core/signin.html',
                    controller: 'LoginController'
                }).state('signup', {
                    url: '/signup',
                    templateUrl: 'partials/core/signup.html',
                    controller: 'SignupFormController'
                }).state('404', {
                    url: '/404',
                    templateUrl: 'partials/core/page_404.html',
                    controller: ''
                }).state('forgotpassword', {
                    url: '/forgotpassword',
                    templateUrl: 'partials/core/forgotpassword.html',
                    controller: ''
                }).state('home', {
                    url: '/',
                    templateUrl: 'partials/core/home.html',
                    controller: ''
                });
        }]);
    });