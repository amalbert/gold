(function() {
	var Store = require('../model/store');
	var storeService = require('../services/stores');
	var securityService = require('../services/security');

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
		if (!securityService.isSecured(req)) {
			res.status(401);
			res.send('Forbidden');

			return;
		}
		
		var store = new Store(req.body);
		/*store.save(function (err) {
			if (err)
				throw err;
			res.send(store);
		});*/
		storeService.save(store).then(function(storeUpdated) {
			res.send(storeUpdated);
		}, function(err) {
			console.log(error);
			res.send(err);
		});
	}

	api.list = function(req, res) {
		storeService.list().then(function (stores) {
			res.setHeader('Content-Type', 'text/json');
			res.send(stores);
		}, function (error) {
			console.log(error);
		});
	}

	api.find = function(req, res) {
		storeService.findById(req.params.id).then(function (store) {
			res.setHeader('Content-Type', 'text/json');
			res.send(store);
		}, function (error) {
			console.log(error);
		});
	};
	
    module.exports = api;

}());