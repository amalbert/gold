var service = angular.module('Services');

service.factory('StoresService', [ '$rootScope', '$http', '$q', function($rootScope, $http, $q) {
	var service = {};

	service.list = function(callSuccess, callError) {
		$http({
	        url : 'http://localhost:8081/stores',
	        method : 'get',
	        headers : {
	            'Content-Type' : 'application/json'
	        }}).success(callSuccess).error(callError);
	}

    return service;
}]);