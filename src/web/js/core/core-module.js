define(['angular', 'angularUiRouter', 'angularCookies'], function (angular) {
    'use strict';

    var coreModule = angular.module('coreModule', ['ui.router', 'ngCookies'])
        .run([function () {
            console.log('core module running...');
        }]);
    return coreModule;
});