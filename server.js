var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var items = [
	{
		name:'Krugerrand',
		stores: [
			{
				url:'http://www.achat-or-et-argent.fr/or/pieces-d-or-d-investissement/12/krugerrand',
				name:'achat-or-et-argent.fr'
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
];

function scrapeAll() {
	for (var i = 0; i < items.length; i++) {
		var piece = items[i];
		for (var j = 0; j < piece.stores.length; j++) {
			var store = piece.stores[j];
			scrapPage(store, piece);
		}
	}
}
scrapeAll();
setInterval(scrapeAll, 600000); //10 min


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
	
	function scrapPage(store, item) {
		request(store.url, function(error, response, html){
			if (!error){
				var $ = cheerio.load(html);
				switch (store.name) {
					case 'achat-or-et-argent.fr': 
						getAchatOrEtArgentPrice($, store)
						break;
					case 'acheter-or-argent.fr':
						getAcheterOrArgentPrice($, store)
						break;
				}
				console.log(store);
			}
		});
	}
		



app.get('/scrape', function(req, res){
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


});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;