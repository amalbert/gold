'use strict';

angular.module('Controllers', ['Services']);
angular.module('Services', []);
angular.module('Directives', ['Filters']);
angular.module('Filters', []);

angular
  .module('gold', [
    'ngAnimate', 'ngResource', 'ngRoute', 'Directives', 'Services', 'Controllers'
 ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/coins/list'
      })
      .when('/coins/list', {
        templateUrl: 'views/coins/list.html',
        controller: 'CoinsController'
      })
      .when('/coins/new', {
        templateUrl: 'views/coins/detail.html',
        controller: 'CoinsController'
      })
      .when('/coins/detail/:id', {
        templateUrl: 'views/coins/detail.html',
        controller: 'CoinsController'
      })
      .when('/stores/list', {
        templateUrl: 'views/stores/list.html',
        controller: 'StoresController'
      })
      .when('/stores/new', {
        templateUrl: 'views/stores/detail.html',
        controller: 'StoresController'
      })
      .when('/stores/detail/:id', {
        templateUrl: 'views/stores/detail.html',
        controller: 'StoresController'
      })
      .otherwise({
        redirectTo: '/'
      });

  });