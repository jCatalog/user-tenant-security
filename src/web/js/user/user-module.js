define(['angular', 'angularResource', 'ngTable'], function (angular) {
    'use strict';

    var user = angular.module('userModule', ['ngResource', 'ngTable'])
        .run([function () {

            console.log('user module running...');
        }]);
    return user;
});