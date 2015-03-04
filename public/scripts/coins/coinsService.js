var service = angular.module('Services');

service.factory('CoinsService', [ '$rootScope', '$http', '$q', function($rootScope, $http, $q) {
	var service = {};

	service.list = function(callSuccess, callError) {
		$http({
	        url : 'http://localhost:8081/coins',
	        method : 'get',
	        headers : {
	            'Content-Type' : 'application/json'
	        }}).success(callSuccess).error(callError);
	}

    return service;
}]);