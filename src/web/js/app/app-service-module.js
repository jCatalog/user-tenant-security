define(['angular'], function (angular) {
    'use strict';

    var appServiceModule = angular.module('appServiceModule', [])
        .run([function () {
            console.log('app service module running...');
        }]);
    return appServiceModule;
});