(function() {
	var Store = require('../model/store');
	var q = require("q");

	var api = {};
	api.list = function() {
		var deferred = q.defer();
		Store.find(function(err, stores) {
			if (err) deferred.reject(err);
			else deferred.resolve(stores);
		});
		return deferred.promise;
	};
	
    module.exports = api;

}());