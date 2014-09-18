define(['angular', 'angularUiRouter'], function (angular) {
    'use strict';

    var coreModule = angular.module('coreModule', ['ui.router'])
        .run([function () {
            console.log('core module running...');
        }]);
    return coreModule;
});