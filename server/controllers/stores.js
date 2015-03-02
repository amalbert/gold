(function() {
	var Store = require('../model/store');
	var mongodb = require('mongodb');
	var q = require("q");
	
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
		list().then(function (stores) {
			console.log(stores);
			res.setHeader('Content-Type', 'text/json');
			res.send(stores);
		}, function (error) {
			console.log(error);
		});
	}
	
    module.exports = api;

}());