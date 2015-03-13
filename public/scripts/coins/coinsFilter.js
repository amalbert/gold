'use strict';

var filters = angular.module('Filters');

filters.filter('byStore', [function() {
  return function(coins, stores) {
  	if (!coins || !stores)
  		return [];
  	var filtered = [];

  	for (var k = 0; k < coins.length; k++) {
  		var coin = coins[k];
	  	for (var i = 0; i < coin.prices.length; i++) {
	  		var price = coin.prices[i];
  			if (stores[price.store] == true && !filtered.contains(coin))
  				filtered.push(coin);
	  	}
	  }

  	return filtered;
  };
}]);

filters.filter('priceByStore', [function() {
  return function(prices, stores) {
    if (!prices || !stores)
      return [];
    var filtered = [];

    for (var k = 0; k < prices.length; k++) {
      var price = prices[k];
      if (stores[price.store] == true)
          filtered.push(price);
    }

    return filtered;
  };
}]);

/*{
    name:	'Krugerrand',
    enabled:true,
    prices:[ {
	    	store: 'acheter-or-argent.fr', 
	    	years: [
	    		{ price: 0, year: 2015, uri:'afrique-du-sud-1-once-or-krugerrand-2015.html'},
	    		{ price: 0, year: 2014, uri:'afrique-du-sud-1-oz-krugerrand-2014.html'}
	    	]
    	}, {
	    	store: 'achat-or-et-argent.fr', 
	    	years: [{ price: 0, year: 0, uri:'or/pieces-d-or-d-investissement/12/krugerrand'}]
    	}
    ]
}*/
