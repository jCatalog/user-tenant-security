/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

    paths: {
        'angular': '../lib/angular/angular',
        'angularResource': '../lib/angular-resource/angular-resource',
        'angularRoute': '../lib/angular-route/angular-route',
        'angularHttpAuth':'../lib/angular-http-auth/src/http-auth-interceptor',
        'ngTable': '../lib/ng-table/ng-table',
        'domReady': '../lib/requirejs-domready/domReady',
        'user': './user',
        'userControllers': './user/controllers',
        'userServices': './user/services',
        'userDirectives': './user/directives'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularResource': {
            deps: ['angular']
        },
        'angularHttpAuth':{
            deps: ['angular']
        },
        'angularRoute': {
            deps: ['angular']
        },
        'ngTable': {
            deps: ['angular']
        }
    },

    deps: [
        // kick start application... see bootstrap.js
        './bootstrap'
    ]
});