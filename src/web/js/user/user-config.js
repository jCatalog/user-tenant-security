define(['user/user-module',
    'userControllers/user-controller',
    'userControllers/user-list-controller',
    'userControllers/tenant-user-list-controller',
    'userControllers/user-create-controller',
    'userControllers/tenant-user-create-controller',
    'userControllers/tenant-user-edit-controller',
    'userControllers/user-edit-controller'
], function (userModule) {
    'use strict';
    return userModule.config([function () {}]);
});