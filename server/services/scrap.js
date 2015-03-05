(function() {
	var log = require('../logger').logger;

	var Coin = require('../model/coin');
	var Store = require('../model/store');

	var coinService = require('../services/coins');
	var storeService = require('../services/stores');

	var q = require("q");
	var request = require('request');
	var cheerio = require('cheerio');

	function retreivePrice($, selector, year) {
		var deferred = q.defer();
		var priced = false;
		$(selector).filter(function(){
			var data = $(this);
			year.price = parseFloat(data.text().replace('€', '').replace(' ', ''));
			deferred.resolve(year);
			priced = true;
		});

		setTimeout(function() { 
			if (priced == false) {
				log.error(year.uri + ' doesn\'t seem to be a valid URL');
				deferred.resolve(year);
			}
		}, 2000);

		return deferred.promise;
	}

	function getPageContent(url) {
		var deferred = q.defer();
		request(url, function(error, response, html) {
			if (!error) {
				deferred.resolve(cheerio.load(html));
			} else {
				log.error(err);
				deferred.reject(err);
			}
		});

		return deferred.promise;
	}

	function scrapPage(store, year) {
		var deferred = q.defer();

		if (year.uri == '') {
			deferred.resolve(year);
			log.warn(store.name + ' has an empty URL');
			return deferred.promise;
		}

		getPageContent(store.url + '/' + year.uri).then(function($) {
			retreivePrice($, store.priceSelector, year).then(function(year) {
					deferred.resolve(year);
				}, function(err) {
					log.error(err);
					deferred.reject(err);
				});
		}, function(err) {
			log.error(err);
			deferred.reject(err);
		});

		return deferred.promise;
	}

	function updateCoinYearsPrices(price, currentStore) {
		var promises = price.years.map(function(year) {
			var deferred = q.defer();

			scrapPage(currentStore, year).then(function(year) {
				deferred.resolve(year);
			}, function(err) {
				log.error(err);
				deferred.reject(err);
			});

			return deferred.promise;
		});
		return q.all(promises);
	}

	function updateCoinPrices(coin, hashStore) {

		var promises = coin.prices.map(function(price) {
			var deferred = q.defer();

			var currentStore = hashStore[price.store];

			updateCoinYearsPrices(price, currentStore).then(function(year) {
				deferred.resolve(coin);
			}, function(err) {
				log.error(err);
				deferred.reject(err);
			});
			return deferred.promise;
		});

		return q.all(promises);
	}

	var api = {};
	api.scrap = function() {
		log.info('starting to scrap sites');
		storeService.list().then(function (stores) {
			var hashStore = {};
			stores.map(function(store) {
				hashStore[store.name] = store;
			});

			coinService.list().then(function (coins) {
				coins.map(function(coin) {
					if (coin.enabled) {
						updateCoinPrices(coin, hashStore).then(function(coinUpdated) {
							coinService.save(coinUpdated[0]);
							log.info('updating coin ' + coinUpdated[0].name);
						}, function(err) {
							log.error(err);
						});
					}
				});
			}, function (error) {
				log.error(err);
			});
		}, function (error) {
			log.error(err);
		});
	};

	api.scrapOne = function(coin) {
		var deferred = q.defer();

		storeService.list().then(function (stores) {
			var hashStore = {};
			stores.map(function(store) {
				hashStore[store.name] = store;
			});

			updateCoinPrices(coin, hashStore).then(function(coinUpdated) {
				coinService.save(coinUpdated[0]).then(function(coinSaved) {
					deferred.resolve(coinSaved);
				});
				log.info('updating coin ' + coinUpdated[0].name);
			}, function(err) {
				log.error(err);
				deferred.reject(err);
			});

		}, function (error) {
			log.error(err);
			deferred.reject(err);
		});

		return deferred.promise;
	};
	
    module.exports = api;

}());