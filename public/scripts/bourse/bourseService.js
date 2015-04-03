var service = angular.module('Services');

service.factory('BourseService', [ '$rootScope', '$http', '$q', function($rootScope, $http, $q) {
	var service = {};

	var url = 'http://localhost:8081/';

	var success = function(deferred, data) {
    	deferred.resolve(data);
    };

    var error = function(deferred, error) {
    	deferred.reject(error);
    };

    service.get = function() {
		var deferred = $q.defer();
		if (service.last)
			deferred.resolve(service.last);
		else {
			service.find().then(function(bourse) {
				deferred.resolve(service.last);
			}, function(err) {
				deferred.reject(err);
			});
		}

		return deferred.promise;
	}

	service.find = function() {
		var deferred = $q.defer();
		$http({
	        url : url + 'bourse',
	        method : 'get',
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    })
		.success(function(data) { service.last = data; success(deferred, data); })
		.error(function(err) {error(deferred, err)});
		
		return deferred.promise;
	}

	service.getPrime = function(coin, bourse) {
		var spot = bourse.gold.current;
        if (coin.metal == 'Argent')
            spot = bourse.silver.current;

        var sWeight = coin.weight.split(' ');
		var baseOz = 1;
		if (sWeight[1] == 'kg')
			baseOz = 1000 / 31.1;
		else if (sWeight[1] == 'g')
			baseOz = 1 / 31.1;
		baseOz *= sWeight[0];

		return Math.round(((coin.price - spot * baseOz) / spot / baseOz) * 1000) / 10;
	}

	service.refresh = true;
	service.needRefresh = function() {
		if (true /*service.refresh == true*/) {
			service.refresh = false;

			return true;
		}

		return false;
	};

    return service;
}]);