var service = angular.module('Services');

service.factory('BourseService', [ '$rootScope', '$http', '$q', function($rootScope, $http, $q) {
	var service = {};

	var url = 'http://172.18.9.63:8081/';

	var success = function(deferred, data) {
    	deferred.resolve(data);
    };

    var error = function(deferred, error) {
    	deferred.reject(error);
    };

	service.find = function(id) {
		var deferred = $q.defer();
		$http({
	        url : url + 'bourse',
	        method : 'get',
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    })
		.success(function(data) {success(deferred, data)})
		.error(function(err) {error(deferred, err)});
		
		return deferred.promise;
	}

    return service;
}]);