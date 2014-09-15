define(['angular', 'angularResource', 'angular-bootstrap', 'ngTable'], function (angular) {
    'use strict';

    var user = angular.module('userModule', ['ngResource', 'ui.bootstrap', 'ngTable'])
        .run([function () {
            console.log('user module running...');
        }]);
    return user;
});