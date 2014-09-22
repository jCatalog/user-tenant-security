define(['angular', 'angularUiRouter', 'angular-bootstrap', 'angular-bootstrap-tpls', 'angularResource', 'ngTable','core/core-module'], function (angular) {
    'use strict';

    var user = angular.module('userModule', ['ui.bootstrap', 'ui.bootstrap.tpls', 'ngResource', 'ngTable', 'ui.router', 'coreModule'])
        .run([function () {
            console.log('user module running...');
        }]);
    return user;
});