'use strict';

var controllers = angular.module('Controllers');

controllers.controller('CoinsController', [ '$scope', '$log', '$timeout', '$location', '$routeParams', 'CoinsService', 'StoresService', 'BourseService',
    function($scope, $log, $timeout, $location, $routeParams, CoinsService, StoresService, BourseService) {

        $scope.filterCountry = {};
        $scope.filterStore = {};
        $scope.filterMetal = {};

        StoresService.list().then(function (data) {
            $scope.stores = data;
            $scope.stores.map(function(store) {
                $scope.filterStore[store.name] = true;
            });
        });

        BourseService.find().then(function (bourse) {
            $scope.bourse = bourse;
        });

        if ($location.url() == '/coins/list') {
        	CoinsService.list().then(function (data) {
        		$scope.coins = data;
                //$scope.coinsBycountries = {};
                $scope.coins.map(function(coin) {
                   /* if ($scope.coinsBycountries[coin.country] === undefined) {
                        $scope.coinsBycountries[coin.country] = [];*/
                        $scope.filterCountry[coin.country] = true;
                        $scope.filterMetal[coin.metal] = true;
                    //}
                    //$scope.coinsBycountries[coin.country].push(coin);
                });
        	});
        } else if ($location.url().lastIndexOf('/coins/detail', 0) == 0) {
        	var id = $routeParams.id;
        	CoinsService.find(id).then(function (data) {
        		$scope.coin = data;
        	});
        } else if ($location.url() == '/coins/new') {
            $scope.coin = CoinsService.newCoin();
        }

        $scope.findBestPrice = function(coin) {
            return CoinsService.findBestPrice(coin);
        };

        $scope.addYear = function(store) {
            CoinsService.addYear(store);
        };

        $scope.addStore = function(coin) {
            CoinsService.addStore(coin);
        };

        $scope.save = function(coin) {
        	CoinsService.save(coin).then(function (data) {
        		$scope.coin = data;
        	});
        }

 } ]);