'use strict';

define(['angular', 'app'], function(angular, app) {

    return app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/user-list.html',
            controller: 'UserListController'
        });
        $routeProvider.when('/view2', {
            templateUrl: 'partials/user-list.html',
            controller: 'UserListController'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

});