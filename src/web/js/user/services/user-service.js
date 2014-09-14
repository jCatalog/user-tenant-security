define(['user/user-module'], function (userModule) {
    'use strict';

    userModule.factory('UserService', ['$resource',
        function ($resource) {
            return $resource('users/:id', { id: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
});