define([
    'angular',
    'angularRoute',
    './user/controllers/user-list-controller'
], function (angular) {
    'use strict';

    return angular.module('app', ['ngRoute', 'userModule']);
});