define([
    'angular',
    './user/controllers/user-list-controller'
], function (angular) {
    'use strict';

    return angular.module('app', ['userModule']);
});