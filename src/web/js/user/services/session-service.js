define(['user/user-module'], function (userModule) {
    'use strict';

    userModule.service('SessionService', function () {
        this.create = function (username) {
            this.username = username;
        };
        this.destroy = function () {
            this.username = null;
        };
        return this;
    });
});