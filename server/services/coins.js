(function() {
	var Coin = require('../model/coin');
	var q = require("q");
	var mongodb = require("mongodb");

	function resolveResult(deferred) {
		return function(error, result) {
			if (error) deferred.reject(error);
			else deferred.resolve(result);
		}
	}

	var api = {};
	api.list = function() {
		var deferred = q.defer();
		Coin.find(resolveResult(deferred));//.populate('prices.store');
		
		return deferred.promise;
	};

	api.findById = function(id) {
		var deferred = q.defer();
		Coin.findOne({_id: new mongodb.ObjectID(id)}, resolveResult(deferred));
		
		return deferred.promise;
	};

	api.save = function(coin) {
		function manageResult(err, result) {
		    if (err) { console.log(err); deferred.reject(err); }
			else { deferred.resolve(result); } 	
		}

		var deferred = q.defer();

		if (coin._id === undefined)	
			coin.save(manageResult);
		else {
			var c = coin.toObject();
			delete c.__v;

			Coin.findOneAndUpdate({ _id: coin._id }, c, { upsert: true }, manageResult);
		}

		return deferred.promise;
	}
	
    module.exports = api;
/*
    var Store = require('../model/store');

    var store = new Store({
	    name:			'achat-or-et-argent.fr',
	    url:			'http://www.achat-or-et-argent.fr/',
	    priceSelector:	'#tdPu0-9',
	    enabled:		true
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
		    	years: [
		    		{ price: 0, year: 2015, uri:'afrique-du-sud-1-once-or-krugerrand-2015.html'},
		    		{ price: 0, year: 2014, uri:'afrique-du-sud-1-oz-krugerrand-2014.html'}
		    	]
	    	}, {
		    	store: 'achat-or-et-argent.fr', 
		    	years: [{ price: 0, year: 0, uri:'or/pieces-d-or-d-investissement/12/krugerrand'}]
	    	}
	    ]
	});

	coin.save(function (err) {
			if (err)
				throw err;
		});

	var coin = new Coin({
	    name:	'American Eagle 1 oz',
	    enabled:true,
	    prices:[ {
		    	store: 'acheter-or-argent.fr', 
		    	years: [
		    		{ price: 0, year: 2014, uri:'etats-unis-1-once-american-eagle-2014.html'}
		    	]
	    	}, {
		    	store: 'achat-or-et-argent.fr', 
		    	years: [{ price: 0, year: 2014, uri:'or/pieces-modernes/1026/american-eagle-1-once---2014'}]
	    	}
	    ]
	});

	coin.save(function (err) {
			if (err)
				throw err;
		});
*/
}());