(function() {
	var Coin = require('../model/coin');
	var Store = require('../model/store');

	var coinService = require('../services/coins');
	var storeService = require('../services/stores');

	var request = require('request');
	var cheerio = require('cheerio');

	function retreivePrice($, selector, year) {
		$(selector).filter(function(){
			var data = $(this);
			year.price = parseFloat(data.text().replace('€', '').replace(' ', ''));
		});
	}

	function scrapPage(store, year) {
		request(store.url + '/' + year.uri, function(error, response, html){
			if (!error){
				var $ = cheerio.load(html);
				retreivePrice($, store.priceSelector, year);
			}
		});
	}

	var api = {};
	api.scrap = function() {
		storeService.list().then(function (stores) {
			var hashStore = {};
			stores.map(function(store) {
				hashStore[store.name] = store;
			});

			coinService.list().then(function (coins) {
				coins.map(function(coin) {
					if (coin.enabled) {
						coin.prices.map(function(price) {
							var currentStore = hashStore[price.store];

							price.years.map(function(year) {
								scrapPage(currentStore, year);
							});
						});
					}
				});
			}, function (error) {
				console.log(error);
			});
		}, function (error) {
			console.log(error);
		});
	};
	
    module.exports = api;

}());
