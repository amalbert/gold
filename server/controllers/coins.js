(function() {
	var Coin = require('../model/coin');
	var coinService = require('../services/coins');

	var api = {};
	api.save = function(req, res) {
		var Coin = new Coin(req.body);

		coinService.save(Coin).then(function(Coin) {
			res.send(Coin);
		});
	}

	api.list = function(req, res) {
		coinService.list().then(function (coins) {
			console.log(coins);
			res.setHeader('Content-Type', 'text/json');
			res.send(coins);
		}, function (error) {
			console.log(error);
		});
	}
	
    module.exports = api;

}());