// we get all the test files automatically
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/-spec\.js$/i.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    paths: {
        'angular': '/base/src/web/lib/angular/angular',
        'angularResource': '/base/src/web/lib/angular-resource/angular-resource',
        'angularRoute': '/base/src/web/lib/angular-route/angular-route',
        angularMocks: '/base/src/web/lib/angular-mocks/angular-mocks',
        'ngTable': '/base/src/web/lib/ng-table/ng-table',
        'domReady': '/base/src/web/lib/requirejs-domready/domReady',
        'user': './user',
        'userControllers': './user/controllers',
        'userServices': './user/services',
        'userDirectives': './user/directives'
    },
    baseUrl: '/base/src/web/js',
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularResource': {
            deps: ['angular']
        },
        'angularRoute': {
            deps: ['angular']
        },
        'ngTable': {
            deps: ['angular']
        },
        'angularMocks': {
            deps: ['angular'],
            'exports': 'angular.mock'
        }
    },
    deps: tests,
    callback: window.__karma__.start
});