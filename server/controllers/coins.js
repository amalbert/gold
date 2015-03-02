(function() {
	var Coin = require('../model/coin');
	var mongodb = require('mongodb');
	var q = require("q");
	
	var api = {};
	api.save = function(req, res) {
		var Coin = new Coin(req.body);
		Coin.save(function (err) {
			if (err)
				throw err;
			res.send(Coin);
		});
	}

	api.list = function(req, res) {
		list().then(function (Coins) {
			console.log(Coins);
			res.setHeader('Content-Type', 'text/json');
			res.send(Coins);
		}, function (error) {
			console.log(error);
		});
	}
	
    module.exports = api;

}());