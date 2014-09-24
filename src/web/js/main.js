/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

    paths: {
        'angular': '../lib/angular/angular',
        'angular-bootstrap': '../lib/angular-bootstrap/ui-bootstrap',
        'angular-bootstrap-tpls': '../lib/angular-bootstrap/ui-bootstrap-tpls',
        'angularResource': '../lib/angular-resource/angular-resource',
        'angularRoute': '../lib/angular-route/angular-route',
        'angularUiRouter': '../lib/angular-ui-router/release/angular-ui-router',
        'angularCookies': '../lib/angular-cookies/angular-cookies',
        'angularHttpAuth': '../lib/angular-http-auth/src/http-auth-interceptor',
        'ngTable': '../lib/ng-table/ng-table',
        'ng-table-export': '../lib/ng-table-export/ng-table-export',
        'domReady': '../lib/requirejs-domready/domReady',
        'core': './core',
        'coreControllers': './core/controllers',
        'coreServices': './core/services',
        'coreDirectives': './core/directives',
        'role': './role',
        'roleControllers': './role/controllers',
        'roleServices': './role/services',
        'user': './user',
        'userControllers': './user/controllers',
        'userServices': './user/services',
        'userDirectives': './user/directives',
        'tenant': './tenant',
        'tenantControllers': './tenant/controllers',
        'tenantServices': './tenant/services',
        'tenantDirectives': './tenant/directives'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularCookies': {
            deps: ['angular']
        },
        'angularResource': {
            deps: ['angular']
        },
        'angularHttpAuth': {
            deps: ['angular']
        },
        'angularRoute': {
            deps: ['angular']
        },
        'angularUiRouter': {
            deps: ['angular']
        },
        'ngTable': {
            deps: ['angular']
        },
        'angular-bootstrap': {
            deps: ['angular']
        },
        'ng-table-export': {
            deps: ['ngTable']
        },
        'angular-bootstrap-tpls': {
            deps: ['angular']
        }
    },

    deps: [
        // kick start application... see bootstrap.js
        './bootstrap'
    ]
});