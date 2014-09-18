define(['angular', 'angularUiRouter', 'angular-bootstrap', 'angular-bootstrap-tpls', 'angularResource', 'ngTable'], function (angular) {
    'use strict';

    var tenant = angular.module('tenantModule', ['ui.bootstrap', 'ui.bootstrap.tpls', 'ngResource', 'ngTable', 'ui.router'])
        .run([function () {
            console.log('tenant module running...');
        }]);
    return tenant;
});