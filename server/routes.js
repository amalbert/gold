(function() {
	var coins = require('./controllers/coins');
	var stores = require('./controllers/stores');
	var bourse = require('./controllers/bourse');
	var log = require('./logger').logger;

	this.configure = function(app) {
		app.post('/coin', coins.save);
		app.get('/coins', coins.list);
		app.get('/coin/:id', coins.find);

		app.post('/store', stores.save);
		app.get('/stores', stores.list);
		app.get('/store/:id', stores.find);

		app.get('/bourse', bourse.find);
	}
    module.exports = {
        routes : this
    }

}());