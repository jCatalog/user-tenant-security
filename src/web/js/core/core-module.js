define(['angular', 'angularUiRouter', 'angularCookies', 'angularSanitize', 'angularGrowl'], function (angular) {
    'use strict';

    var coreModule = angular.module('coreModule', ['ui.router', 'ngCookies', 'ngSanitize', 'angular-growl'])
        .config(function (growlProvider) {
    		growlProvider.globalTimeToLive(3000);
		})
        .run([function () {
            console.log('core module running...');
        }]);
    return coreModule;
});