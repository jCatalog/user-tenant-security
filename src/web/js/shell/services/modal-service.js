define(['user/user-module'], function (userModule) {
    'use strict';
    userModule.service('ModalService', ['$modal',
        function ($modal) {
            this.form = function (data) {
                showModalForm('edit', data);
            };

            this.confirm = function (data) {
                showModalForm('confirm', data);
            };

            var showModalForm = function (templatename, data) {
                $modal.open({
                    templateUrl: 'partials/modal-template-' + templatename + '.html',
                    controller: function ($scope, $modalInstance, data) {
                        $scope.data = data;

                        $scope.ok = function () {
                            $modalInstance.close('');
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    },
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        data: function () {
                            return data;
                        }
                    }
                });
            };
        }]);
});