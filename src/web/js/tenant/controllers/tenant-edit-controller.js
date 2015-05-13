define(['tenant/tenant-module'], function (tenantModule) {
    'use strict';
    tenantModule.controller('TenantEditController', ['$scope', 'TenantService', '$stateParams', '$location',
    	function ($scope, TenantService, $stateParams, $location) {
    		(function () {
	            TenantService.get({id: $stateParams.id}, function (tenant) {
	                $scope.tenant = tenant;
	            });
	        })();

	        $scope.cancel = function()
	        {
	        	 TenantService.get({id: $stateParams.id}, function (tenant) {
	                $scope.tenant = tenant;
	            });
	        };

	        $scope.updateTenant = function(tenant)
	        {
	        	TenantService.update(tenant, function (result) {
	        		if(result)
	        		{
	        			$location.path('/tenant/list')
	        		}	
	        	});	
	        };
    }]);
});
