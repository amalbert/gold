(function() {
	var log4js = require('log4js');
	log4js.clearAppenders();
	log4js.loadAppender('console');
	log4js.loadAppender('file');
	log4js.addAppender(log4js.appenders.file('app.log'), 'MongoTest');
	log4js.addAppender(log4js.appenders.console(), 'MongoTest');
	var logger = log4js.getLogger('MongoTest');
	logger.setLevel('TRACE');

	var getLogger = function() {
	   return logger;
	};

	exports.logger = getLogger();
}());