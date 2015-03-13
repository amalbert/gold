(function() {
	var log = require('../logger').logger;

	var api = {};

	api.isSecured = function(req) {
		if (req.connection.remoteAddress == '127.0.0.1')
			return true;

		logger.error(req.connection.remoteAddress + ' is trying to connect to ' + req.originalUrl);
	};
	
    module.exports = api;

}());

