'use strict';

angular.module('Controllers', ['Services', 'Filters']);
angular.module('Services', ['Filters']);
angular.module('Directives', ['Filters']);
angular.module('Filters', []);

angular
  .module('gold', [ 'ngAnimate', 'ngResource', 'ngRoute', 'Directives', 'Services', 'Controllers', 'Filters' ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/coins/list/Or'
      })
      .when('/coins/list/:metal', {
        templateUrl: 'views/coins/list.html',
        controller: 'CoinsController'
      })
      .when('/admin/coins/new', {
        templateUrl: 'views/coins/detail-admin.html',
        controller: 'CoinsController'
      })
      .when('/admin/coins/detail/:id', {
        templateUrl: 'views/coins/detail-admin.html',
        controller: 'CoinsController'
      })
      .when('/coins/detail/:id', {
        templateUrl: 'views/coins/detail.html',
        controller: 'CoinsController'
      })
      .when('/admin/stores/list', {
        templateUrl: 'views/stores/list.html',
        controller: 'StoresController'
      })
      .when('/admin/stores/new', {
        templateUrl: 'views/stores/detail.html',
        controller: 'StoresController'
      })
      .when('/admin/stores/detail/:id', {
        templateUrl: 'views/stores/detail.html',
        controller: 'StoresController'
      })
      .otherwise({
        redirectTo: '/'
      });

  });

  
if (!Array.prototype.contains) {
  Array.prototype.contains = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return true;
    }
    return false;
  };
}