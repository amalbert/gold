'use strict';

var controllers = angular.module('Controllers');

controllers.controller('StoresController', [ '$scope', '$log', '$timeout', '$location', '$routeParams', 'StoresService', 'LocationService', 'CoinsService', 'BourseService',
    function($scope, $log, $timeout, $location, $routeParams, StoresService, LocationService, CoinsService, BourseService) {

        CoinsService.list().then(function (coins) {
            StoresService.list().then(function (stores) {

                BourseService.get().then(function (bourse) {
                    $scope.bourse = bourse;
                    $scope.coinsByStore = CoinsService.computeCoinsByStore(coins, bourse);
                    
                });
            });

        });

        if (LocationService.isStoreDetailUrl()) {
        	var id = $routeParams.id;
        	StoresService.find(id).then(function (data) {
        		$scope.store = data;
        	});
        } else if (LocationService.isStoreNewUrl()) {
            $scope.store = StoresService.newStore();
        }

        $scope.save = function(store) {
        	StoresService.save(store).then(function (data) {
        		$scope.store = data;
        	});
        }

 } ]);