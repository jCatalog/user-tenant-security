define(['tenant/tenant-module'], function (tenantModule) {
    'use strict';
    tenantModule.controller('TenantEditController', ['$scope', 'TenantService', '$stateParams', '$location', 'growl',
    	function ($scope, TenantService, $stateParams, $location, growl) {
    		(function () {
	            TenantService.get({id: $stateParams.id}, function (tenant) {
	                $scope.tenant = tenant;
	            });
	        })();

	        $scope.cancel = function(dirty)
	        {
	        	if(dirty)
	        	{	
		        	TenantService.get({id: $stateParams.id}, function (tenant) {
		                $scope.tenant = tenant;
		            });
		        }
		        else
		        {
		        	$location.path('/tenant/list');
		        }    
	        };

	        $scope.updateTenant = function(tenant)
	        {
	        	TenantService.update(tenant, function (result) {
	        		if(result)
	        		{
	        			growl.addSuccessMessage('Tenant Updated Succesfully');
	        			$location.path('/tenant/list');
	        		}	
	        	});	
	        };
    }]);
});
