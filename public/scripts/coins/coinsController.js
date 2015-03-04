'use strict';

var controllers = angular.module('Controllers');

controllers.controller('CoinsController', [ '$scope', '$log', '$timeout', 'CoinsService', 'StoresService',
    function($scope, $log, $timeout, CoinsService, StoresService) {
        
        $scope.list = function() {

        };
        CoinsService.list(function(data) {
        	$scope.coins = data;
        }, function(error) {});

        StoresService.list(function(data) {
        	$scope.stores = data;
        }, function(error) {});

 } ]);