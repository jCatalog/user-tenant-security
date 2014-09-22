define(['user/user-module',
    'userControllers/user-controller',
    'userControllers/user-list-controller',
    'userControllers/user-create-controller',
    'userControllers/user-detail-controller',
    'userControllers/user-edit-controller'
], function (userModule) {
    'use strict';
    return userModule.config([function () {}]);
});