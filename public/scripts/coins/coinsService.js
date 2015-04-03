var service = angular.module('Services');

service.factory('CoinsService', [ '$rootScope', '$http', '$q', 'BourseService', function($rootScope, $http, $q, BourseService) {
	var service = {};

	var success = function(deferred, data) {
    	deferred.resolve(data);
    };

    var error = function(deferred, error) {
    	deferred.reject(error);
    };

    var url = 'http://localhost:8081/';

	service.list = function(bourse, filterStore) {
		var deferred = $q.defer();
		$http({
	        url : url + 'coins',
	        method : 'get',
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    })
		.success(function(data) {
			data.map(function(coin) {
				coin.bestPrice = function(coin) {
	                coin.currentBestPrice = service.findBestPrice(coin, filterStore);
	                return coin.currentBestPrice;
	            }

	            coin.prime = function(coin) {
	                coin.currentBestPrime =  service.getPrime(coin.bestPrice(coin), bourse, coin);

	                return coin.currentBestPrime;
	            }
			});
			
			success(deferred, data);
		})
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

	service.getPrime = function(price, bourse, coin) {
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

		return Math.round(((price - spot * baseOz) / spot / baseOz) * 1000) / 10;
	};

	service.refresh = true;
	service.needRefresh = function() {
		if (true /*service.refresh == true*/) {
			service.refresh = false;

			return true;
		}

		return false;
	};

	function buildCoinByStore(price, coin, year) {
		var res = {
			id:coin._id,
			storeName:price.store,
			name:coin.name,
			price:year.price,
			year:year.year,
			uri:year.uri,
			weight:coin.weight,
			metal:coin.metal,
			country:coin.country,
			imagesDir:coin.imagesDir,
			getKey: function() {
				return this.name + '-' + this.metal + '-' + this.weight;
			}
		};
		/*if (year.uri == 'nouvelle-zelande-1-once-d-or-fiji-taku-2014.html')
			console.log(coin)*/
		return res;
	}

	service.computeCoinsByStore = function(coins, bourse) {
		var coinsByStore = {};

		coins.map(function(coin) {
			var bestPriceByStore = null;
			coin.prices.map(function(price) {
				if (!coinsByStore[price.store])
					coinsByStore[price.store] = { 
						bestCoins: {}, 
						goodCoins: {}
					};

				for (var i = 0; i < price.years.length; i++) {
					var year = price.years[i];

					if (bestPriceByStore == null || bestPriceByStore.price > year.price) {
						bestPriceByStore = buildCoinByStore(price, coin, year);
					}
				}
			});

			// On a trouvé le meilleur store pour cette piece
			coinsByStore[bestPriceByStore.storeName].bestCoins[bestPriceByStore.getKey()] = bestPriceByStore;
			bestPriceByStore.prime = BourseService.getPrime(bestPriceByStore, bourse);

			coin.prices.map(function(price) {
				var goodPriceByStore = null;
				for (var i = 0; i < price.years.length; i++) {
					var year = price.years[i];

					if (goodPriceByStore == null || goodPriceByStore.price > year.price) {
						goodPriceByStore = buildCoinByStore(price, coin, year);
					}
				}

				if (goodPriceByStore != null && coinsByStore[price.store].bestCoins[goodPriceByStore.getKey()] === undefined) {
					coinsByStore[price.store].goodCoins[goodPriceByStore.getKey()] = goodPriceByStore;
					goodPriceByStore.prime = BourseService.getPrime(goodPriceByStore, bourse);
				}
			});
		});


		
		Object.keys(coinsByStore).map(function (store) {
			coinsByStore[store].bestCoins = Object.keys(coinsByStore[store].bestCoins).map(function (coin) {
				return coinsByStore[store].bestCoins[coin];
			});
			coinsByStore[store].goodCoins = Object.keys(coinsByStore[store].goodCoins).map(function (coin) {
				return coinsByStore[store].goodCoins[coin];
			});
		});

        return coinsByStore;
	};

    return service;
}]);