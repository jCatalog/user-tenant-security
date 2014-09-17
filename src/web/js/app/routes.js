'use strict';

define(['angular', 'app/app-module'], function(angular, app) {

    return app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/user-list.html',
            controller: 'UserController'
        });
        $routeProvider.when('/users', {
            templateUrl: 'partials/user-list.html',
            controller: 'UserController'
        });
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
});