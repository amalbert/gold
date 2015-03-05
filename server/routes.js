(function() {
	var coins = require('./controllers/coins');
	var stores = require('./controllers/stores');
	var log = require('./logger').logger;

	this.configure = function(app) {
		app.post('/coin', coins.save);
		app.get('/coins', coins.list);
		app.get('/coin/:id', coins.find);

		app.post('/store', stores.save);
		app.get('/stores', stores.list);
		app.get('/store/:id', stores.find);
	}
    module.exports = {
        routes : this
    }

}());