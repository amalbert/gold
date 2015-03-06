(function() {
	var Bourse = require('../model/bourse');
	var bourseService = require('../services/bourse');

	function list() {
		var deferred = q.defer();
		Store.find(function(err, stores) {
			if (err) deferred.reject(err);
			else deferred.resolve(stores);
		});
		return deferred.promise;
	}

	var api = {};

	api.find = function(req, res) {
		bourseService.find().then(function (bourse) {
			res.setHeader('Content-Type', 'text/json');
			res.send(bourse);
		}, function (error) {
			console.log(error);
		});
	}

    module.exports = api;

}());