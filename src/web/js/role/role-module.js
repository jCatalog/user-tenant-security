define(['angular', 'angularUiRouter', 'angular-bootstrap', 'angular-bootstrap-tpls', 'angularResource', 'ngTable'], function (angular) {
    'use strict';

    var role = angular.module('roleModule', ['ui.bootstrap', 'ui.bootstrap.tpls', 'ngResource', 'ngTable', 'ui.router'])
        .run([function () {
            console.log('role module running...');
        }]);
    return role;
});