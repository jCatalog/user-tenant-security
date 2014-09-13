'use strict';

define(['angular', 'app'], function(angular, app) {

    return app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/user-list.html',
            controller: 'UserListController'
        });
        $routeProvider.when('/signin', {
            templateUrl: 'partials/signin.html',
            controller: 'UserListController'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

});