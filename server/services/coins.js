(function() {
	var Coin = require('../model/coin');
	var q = require("q");

	var api = {};
	api.list = function() {
		var deferred = q.defer();
		Coin.find(function(err, coins) {
			if (err) deferred.reject(err);
			else deferred.resolve(coins);
		});//.populate('prices.store');
		return deferred.promise;
	};

	api.save = function(coin) {
		var deferred = q.defer();
		coin.save(function (err) {
			if (err)
				deferred.reject(err);
			else deferred.resolve(coin);
		});
		return deferred.promise;
	}
	
    module.exports = api;

/*    var Store = require('../model/store');

    var store = new Store({
	    name:			'acheter-or-argent.fr',
	    url:			'http://www.acheter-or-argent.fr',
	    priceSelector:	'.introProduit span.prixProduit',
	    enabled:		true,
	    coins: 			[]
	});

	store.save(function (err) {
		if (err)
			throw err;
	});

    var coin = new Coin({
	    name:	'Krugerrand',
	    enabled:true,
	    prices:[ {
		    	store: 'acheter-or-argent.fr', 
		    	years: [{ price: 1000.5, year: 2015, uri:'afrique-du-sud-1-once-or-krugerrand-2015.html'}],

	    	}
	    ]
	});

	coin.save(function (err) {
			if (err)
				throw err;
		});*/

}());