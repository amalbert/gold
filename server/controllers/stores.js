(function() {
	var Store = require('../model/store');
	var storeService = require('../services/stores');

	function list() {
		var deferred = q.defer();
		Store.find(function(err, stores) {
			if (err) deferred.reject(err);
			else deferred.resolve(stores);
		});
		return deferred.promise;
	}

	
	var api = {};
	api.save = function(req, res) {
		var Store = new Store(req.body);
		Store.save(function (err) {
			if (err)
				throw err;
			res.send(Store);
		});
	}

	api.list = function(req, res) {
		storeService.list().then(function (stores) {
			console.log(stores);
			res.setHeader('Content-Type', 'text/json');
			res.send(stores);
		}, function (error) {
			console.log(error);
		});
	}
	
    module.exports = api;

}());