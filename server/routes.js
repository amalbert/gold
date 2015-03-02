(function() {
	var coins = require('./controllers/coins');
	var stores = require('./controllers/stores');
	var log = require('./logger').logger;

	this.configure = function(app) {
		app.post('/coins', coins.save);
		app.get('/coins', coins.list);

		app.post('/stores', stores.save);
		app.get('/stores', stores.list);
	}
    module.exports = {
        routes : this
    }

}());