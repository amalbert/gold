(function() {
	var Store = require('../model/store');
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
		Store.find(resolveResult(deferred));
		return deferred.promise;
	};

	api.save = function(store) {
		function manageResult(err, result) {
		    if (err) { console.log(err); deferred.reject(err); }
			else { deferred.resolve(result); } 	
		}

		var deferred = q.defer();

		if (store._id === undefined)	
			store.save(manageResult);
		else {
			var c = store.toObject();
			delete c.__v;

			Store.findOneAndUpdate({ _id: store._id }, c, { upsert: true }, manageResult);
		}

		return deferred.promise;
	}

	api.findById = function(id) {
		var deferred = q.defer();
		Store.findOne({_id: new mongodb.ObjectID(id)}, resolveResult(deferred));
		
		return deferred.promise;
	};
	
    module.exports = api;

}());