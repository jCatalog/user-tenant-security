define([
    'angular',
    'angular-route',
    './user/controllers/user-list-controller'
], function (angular) {
    'use strict';

    return angular.module('app', ['ngRoute', 'userModule']);
});