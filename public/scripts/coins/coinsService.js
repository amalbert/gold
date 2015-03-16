var service = angular.module('Services');

service.factory('CoinsService', [ '$rootScope', '$http', '$q', function($rootScope, $http, $q) {
	var service = {};

	var success = function(deferred, data) {
    	deferred.resolve(data);
    };

    var error = function(deferred, error) {
    	deferred.reject(error);
    };

    var url = 'http://localhost:8081/';

	service.list = function() {
		var deferred = $q.defer();
		$http({
	        url : url + 'coins',
	        method : 'get',
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    })
		.success(function(data) {success(deferred, data)})
		.error(function(error) {error(deferred, error)});

		return deferred.promise;
	}

	service.find = function(id) {
		var deferred = $q.defer();
		$http({
	        url : url + 'coin/' + id,
	        method : 'get',
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    })
		.success(function(data) {success(deferred, data)})
		.error(function(err) {error(deferred, err)});
		
		return deferred.promise;
	}

	service.save = function(coin) {
		var deferred = $q.defer();
		$http({
	        url : url + 'coin/',
	        method : 'post',
	        data: coin,
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    })
		.success(function(data) {success(deferred, data)})
		.error(function(err) {error(deferred, err)});
		
		return deferred.promise;
	}

	service.newCoin = function() {
		return {
            name:   '',
            enabled:true,
            prices:[ {
                    store: '', 
                    years: [
                        { price: 0, year: 0, uri:''}
                    ]
                }
            ]
        };
	};

	service.addYear = function(store) {
		store.years.push({price: 0, year: 0, uri:''});
	};

	service.addStore = function(coin) {
		coin.prices.push({ store: '',  years: [ { price: 0, year: 0, uri:''} ] });
	};

	service.findBestPrice = function(coin, stores) {
		var bestPrice = 0;
		for (var i = 0; i < coin.prices.length; i++) {
			var price = coin.prices[i];
			if (!stores || stores[price.store]) {
				for (var j = 0; j < price.years.length; j++) {
					var year = price.years[j];

					if (bestPrice == 0)
						bestPrice = year.price;
					if (bestPrice > year.price) {
						bestPrice = year.price;
					}
				}
			}
		}

		return bestPrice;
	};

	service.findBestStoreForCoin = function(coin, stores) {
		var bestStore = {price:0};
		for (var i = 0; i < coin.prices.length; i++) {
			var price = coin.prices[i];
			if (!stores || stores[price.store]) {
				for (var j = 0; j < price.years.length; j++) {
					var year = price.years[j];

					if (bestStore.price > year.price || bestStore.price == 0) {
						bestStore.price = year.price;
						bestStore.year = year.year;
						bestStore.store = price.store;
						bestStore.coinUri = year.uri;
					}
				}
			}
		}

		return bestStore;
	};

	service.getPrime = function(price, spot, weight) {
		var sWeight = weight.split(' ');
		var baseOz = 1;
		if (sWeight[1] == 'kg')
			baseOz = 1000 / 31.1;
		else if (sWeight[1] == 'g')
			baseOz = 1 / 31.1;
		baseOz *= sWeight[0];

		return Math.round(((price - spot * baseOz) / spot / baseOz) * 1000) / 10;
		
	};

    return service;
}]);