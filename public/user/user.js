'use strict';

angular.module('app.user', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])
    .controller('View1Ctrl', [function() {

    }]);