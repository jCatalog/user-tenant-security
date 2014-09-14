define(['angular', 'angularResource', 'ngTable', 'angularCookies'], function (angular) {
    'use strict';

    var user = angular.module('userModule', ['ngResource', 'ngTable', 'ngCookies'])
        .run([function () {
            console.log('user module running...');
        }]);
    return user;
});