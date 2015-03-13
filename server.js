var express = require('express');


var path 	= require('path');
var bodyParser = require('body-parser');
var app     = express();
var mongoose = require('mongoose');
var log = require('./server/logger').logger;

var scrapService = require('./server/services/scrap');

/*var items = [
	{
		name:'Krugerrand',
		stores: [
			{
				url:'http://www.achat-or-et-argent.fr/or/pieces-d-or-d-investissement/12/krugerrand',
				name:'achat-or-et-argent.fr',
			},
			{
				url:'http://www.acheter-or-argent.fr/afrique-du-sud-1-once-or-krugerrand-2015.html',
				name:'acheter-or-argent.fr'
			}
		]
	},
	{
		name:'American Eagle 1 oz',
		stores: [
			{
				url:'http://www.acheter-or-argent.fr/etats-unis-1-once-american-eagle-2014.html',
				name:'acheter-or-argent.fr'
			}
		]
	}
];*/

function scrapCoins() {
	scrapService.scrap();
}

function scrapGold() {
	scrapService.scrapGold();
}

scrapCoins();
scrapGold();
setInterval(scrapCoins, 600000); //10 min
setInterval(scrapGold, 60000); //1 min

/*
	function getAchatOrEtArgentPrice($, store) {
		$('#tdPu0-9').filter(function(){
			var data = $(this);
			// title = data.children().first().text();            
			// release = data.children().last().children().text();

			store.price = parseFloat(data.text().replace('€', '').replace(' ', ''));
		});
	}
	function getAcheterOrArgentPrice($, store) {
		$('.introProduit span.prixProduit').filter(function(){
			var data = $(this);
			store.price = parseFloat(data.text());
		});
	}
	
	
	*/	

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var d = require('domain').create();

	d.on('error', function(er) {
		log.error('Mongo DB connection lost, trying to reconnect');
	});

	d.run(function() {
		mongoose.connect('mongodb://localhost/gold');
		log.info('Trying to connect to Mongo DB');
	});

/*app.get('/scrape', function(req, res){
	var result = ''
	for (var i = 0; i < items.length; i++) {
		var piece = items[i];
		result += piece.name + '<br/>';
		for (var j = 0; j < piece.stores.length; j++) {
			var store = piece.stores[j];
			result += store.name + ' : ' + store.price + '<br/>';
		}
	}
	res.send(result);


});*/

var routes = require('./server/routes').routes;
routes.configure(app);

app.listen('8081')
console.log('Magic happens on port 8081');
