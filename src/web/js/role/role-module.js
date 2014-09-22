define(['angular', 'angularUiRouter', 'angular-bootstrap', 'angular-bootstrap-tpls', 'angularResource', 'ngTable', 'core/core-module'], function (angular) {
    'use strict';

    var role = angular.module('roleModule', ['ui.bootstrap', 'ui.bootstrap.tpls', 'ngResource', 'ngTable', 'ui.router', 'coreModule'])
        .run([function () {
            console.log('role module running...');
        }]);
    return role;
});