var service = angular.module('Services');

service.factory('StoresService', [ '$rootScope', '$http', '$q', function($rootScope, $http, $q) {
	var service = {};

	var url = 'http://172.18.9.63:8081/';

	var success = function(deferred, data) {
    	deferred.resolve(data);
    };

    var error = function(deferred, error) {
    	deferred.reject(error);
    };


	service.list = function() {
		var deferred = $q.defer();
		
		$http({
	        url : url + 'stores',
	        method : 'get',
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    })
	    .success(function(data) {success(deferred, data)})
		.error(function(err) {error(deferred, err)});

		return deferred.promise;
	}

	service.find = function(id) {
		var deferred = $q.defer();
		$http({
	        url : url + 'store/' + id,
	        method : 'get',
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    })
		.success(function(data) {success(deferred, data)})
		.error(function(err) {error(deferred, err)});
		
		return deferred.promise;
	}

	service.save = function(store) {
		var deferred = $q.defer();
		$http({
	        url : url + 'store/',
	        method : 'post',
	        data: store,
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    })
		.success(function(data) {success(deferred, data)})
		.error(function(err) {error(deferred, err)});
		
		return deferred.promise;
	}

	service.newStore = function() {
		return {
		    name:			'',
		    url:			'http://',
		    priceSelector:	'',
		    enabled:		true
		};
	};

    return service;
}]);