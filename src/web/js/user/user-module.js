define(['angular', 'angularUiRouter', 'angular-bootstrap', 'angular-bootstrap-tpls', 'angularResource', 'ngTable'], function (angular) {
    'use strict';

    var user = angular.module('userModule', ['ui.bootstrap', 'ui.bootstrap.tpls', 'ngResource', 'ngTable', 'ui.router'])
        .run([function () {
            console.log('user module running...');
        }]);
    return user;
});