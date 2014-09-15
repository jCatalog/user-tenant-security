define(['user/user-module'], function (userModule) {
    'use strict';
    userModule.service('modalService', ['$modal',
        function ($modal) {
            this.open = function () {
                $modal.open({
                    templateUrl: 'partials/modal-template.html',
                    controller: function ($scope, $modalInstance, items) {
                        $scope.items = items;
                        $scope.selected = {
                            item: $scope.items[0]
                        };

                        $scope.ok = function () {
                            $modalInstance.close($scope.selected.item);
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    },
                    backdrop: false,
                    size:'lg',
                    windowTemplateUrl: 'partials/modal-window.html',
                    resolve: {
                        items: function () {
                            return ['item1', 'item2', 'item3'];
                        }
                    }
                });
            };
        }]);
});