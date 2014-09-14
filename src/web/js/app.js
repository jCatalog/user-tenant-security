define([
    'angular',
    'angularRoute',
    'user/user-module',
    'user/user-config'
], function (angular) {
    'use strict';

    return angular.module('app', ['ngRoute', 'userModule']);
});