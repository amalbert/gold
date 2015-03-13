(function() {
	var Coin = require('../model/coin');
	var coinService = require('../services/coins');
	var scrapService = require('../services/scrap');
	var securityService = require('../services/security');

	var api = {};
	api.save = function(req, res) {
		if (!securityService.isSecured(req)) {
			res.status(401);
			res.send('Forbidden');

			return;
		}
		
		var coin = new Coin(req.body);

		//coinService.save(coin).then(function(coinUpdated) {
			scrapService.scrapOne(coin).then(function(coinUpdated) {
				res.send(coinUpdated);
			})
			
		/*}, function(err) {
			console.log(error);
			deferred.reject(err);
			res.send(err);
		});*/
	};

	api.list = function(req, res) {
		coinService.list().then(function (coins) {
			res.setHeader('Content-Type', 'text/json');
			res.send(coins);
		}, function (error) {
			console.log(error);
		});
	};

	api.find = function(req, res) {
		coinService.findById(req.params.id).then(function (coin) {
			res.setHeader('Content-Type', 'text/json');
			res.send(coin);
		}, function (error) {
			console.log(error);
		});
	};
	
    module.exports = api;

}());