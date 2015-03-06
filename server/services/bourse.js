(function() {
	var Bourse = require('../model/bourse');
	var q = require("q");
	var mongodb = require("mongodb");

	var api = {};
	api.find = function() {
		var deferred = q.defer();
		Bourse.find(function(error, result) {
			if (error) deferred.reject(error);
			else deferred.resolve(result[0]);
		});
		return deferred.promise;
	};

	api.save = function(bourse) {
		function manageResult(err, result) {
		    if (err) { console.log(err); deferred.reject(err); }
			else { deferred.resolve(result); } 	
		}

		var deferred = q.defer();

		bourse.save(manageResult);

		return deferred.promise;
	}

    module.exports = api;

}());