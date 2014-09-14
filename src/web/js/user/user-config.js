define(['user/user-module',
    'angularCookies',
    'userControllers/user-list-controller',
    'userControllers/login-controller'
], function (userModule) {
    'use strict';
    return userModule.config(['$routeProvider',
        '$locationProvider',
        '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
            var interceptor = ['$location', '$q', function($location, $q) {
                function success(response) {
                    return response;
                }

                function error(response) {

                    if(response.status === 401) {
                        $location.path('/login');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }

                return function(promise) {
                    return promise.then(success, error);
                };
            }];

            $httpProvider.responseInterceptors.push(interceptor);
            console.log('user configuration done');
        }
    ]);
});
