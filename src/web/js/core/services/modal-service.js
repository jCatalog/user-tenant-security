define(['core/core-module'], function (coreModule) {
    'use strict';
    coreModule.service('ModalService', ['$modal',
        function ($modal) {
            this.showConfirmModal = function (data, okCallback, cancelCallback) {
                $modal.open({
                    templateUrl: 'partials/core/modal-template-confirm.html',
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
                }).result.then(okCallback, cancelCallback);
            };
        }]);
});