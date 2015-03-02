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
        redirectTo: '/coins'
      })
      .when('/coins', {
        templateUrl: 'views/coins/list.html',
        controller: 'CoinsController'
      })
      .otherwise({
        redirectTo: '/'
      });

  });