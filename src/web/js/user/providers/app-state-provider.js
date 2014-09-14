define(['user/user-module'],
    function (userModule) {
        'use strict';
        userModule.provider('appState', ['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {
                console.log('user module provider');
                this.$get = ['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {

                }];
            }]);
    });