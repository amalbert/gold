var service = angular.module('Services');

service.factory('BasketService', [ '$rootScope', '$http', '$q', 'localStorageService', function($rootScope, $http, $q, localStorageService) {
	var service = {};

	service.basket = localStorageService.get('basket') || { coins:[] };

	service.basket.total = function() {
		var amount = 0;
		for (var i = 0; i < service.basket.coins.length; i++) {
			amount += service.basket.coins[i].price;
		};
		return Math.round(amount * 100) / 100;
	};

	// coin : {name, storeName, year, price, uri, metal, weight}
	service.update = function(coins) {
		service.basket.coins.map(function(coin) {
			for (var i = 0; i < coins.length; i++) {
				for (var k = 0; k < coins[i].prices.length; k++) {
					for (var l = 0; l < coins[i].prices[k].years.length; l++) {
						if (coin.name == coins[i].name && coin.uri == coins[i].prices[k].years[l].uri) {
							coin.price = coins[i].prices[k].years[l].price;
							return;
						}
					}
				}
			}
		});
	};

	service.deleteCoin = function(pos) {
		service.basket.coins.splice(pos, 1);
		localStorageService.set('basket', service.basket);
	};

	service.addToBasket = function(coin, uri) {
		for (var k = 0; k < coin.prices.length; k++) {
			for (var l = 0; l < coin.prices[k].years.length; l++) {
				if (uri == coin.prices[k].years[l].uri) {
					service.basket.coins.push({
						name:coin.name,
						storeName:coin.prices[k].store,
						year:coin.prices[k].years[l].year,
						price:coin.prices[k].years[l].price,
						uri:coin.prices[k].years[l].uri,
						metal:coin.metal,
						weight:coin.weight
					});

					localStorageService.set('basket', service.basket);
					return;
				}
			}
		}
	};

    return service;
}]);