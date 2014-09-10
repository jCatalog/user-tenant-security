define(['angular'], function (angular) {
    'use strict';

    var user = angular.module('userModule', [])
        .run([function () {

            console.log('user module running...');
        }]);
    return user;
});