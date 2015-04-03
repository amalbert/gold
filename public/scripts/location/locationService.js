var service = angular.module('Services');

service.factory('LocationService', [ '$location', function($location) {
	var service = {};
	var storesUrl = '/stores';
	var coinsUrl = '/coins';

	service.isUrl = function(url) {
		return $location.url().lastIndexOf(url, 0) == 0;
	};

	service.isStoreListUrl = function() {
		return service.isUrl(storesUrl + '/list');
	};

	service.isStoreDetailUrl = function() {
		return service.isUrl(storesUrl + '/detail');
	};

	service.isStoreNewUrl = function() {
		return service.isUrl('/admin' + storesUrl + '/new');
	};

	service.isCoinListUrl = function() {
		return service.isUrl(coinsUrl + '/list');
	};

	service.isCoinDetailUrl = function() {
		return service.isUrl('/admin' + coinsUrl + '/detail') || service.isUrl(coinsUrl + '/detail');
	};

	service.isCoinNewUrl = function() {
		return service.isUrl('/admin' + coinsUrl + '/new');
	};

    return service;
}]);