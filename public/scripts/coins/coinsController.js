'use strict';

var controllers = angular.module('Controllers');

controllers.controller('CoinsController', [ '$scope', '$log', '$timeout', '$location', '$routeParams', 'CoinsService', 'StoresService', 'BourseService',
    function($scope, $log, $timeout, $location, $routeParams, CoinsService, StoresService, BourseService) {

        $scope.filterCountry = {};
        $scope.filterStore = {};
        $scope.filterMetal = {};
        $scope.filterWeight = {};

        StoresService.list().then(function (data) {
            $scope.stores = data;
            $scope.stores.map(function(store) {
                $scope.filterStore[store.name] = true;
            });
        });

        BourseService.find().then(function (bourse) {
            $scope.bourse = bourse;

            if ($location.url().lastIndexOf('/coins/list', 0) == 0) {
            	CoinsService.list().then(function (data) {
            		$scope.coins = data;
                    
                    $scope.filterMetal[$routeParams.metal] = true;

                    $scope.coins.map(function(coin) {
                        if ($routeParams.metal != coin.metal) {
                            return;
                        }
                        $scope.filterCountry[coin.country] = true;
                        
                        $scope.filterWeight[coin.weight] = true;
                        coin.bestPrice = function(coin) {
                            coin.currentBestPrice = CoinsService.findBestPrice(coin, $scope.filterStore);
                            return coin.currentBestPrice;
                        }

                        coin.prime = function(coin) {
                            if (coin.metal === 'Or') {
                                coin.currentBestPrime =  Math.round(CoinsService.getPrime(coin.bestPrice(coin), bourse.gold.current, coin.weight) * 1000) / 10;
                            } else if (coin.metal === 'Argent') {
                                coin.currentBestPrime =  Math.round(CoinsService.getPrime(coin.bestPrice(coin), bourse.silver.current, coin.weight) * 1000) / 10;
                            }

                            return coin.currentBestPrime;
                        }
                    });
            	});
            } else if ($location.url().lastIndexOf('/admin/coins/detail', 0) == 0 || $location.url().lastIndexOf('/coins/detail', 0) == 0) {
            	var id = $routeParams.id;
            	CoinsService.find(id).then(function (data) {
            		$scope.coin = data;
            	});
            } else if ($location.url() == '/admin/coins/new') {
                $scope.coin = CoinsService.newCoin();
            }
        });

        $scope.orderCoins = 'currentBestPrime';

        $scope.clickOnly = function(value, list) {
            Object.keys(list).map(function(el) {
                if (value == el) 
                    list[el] = true;
                else
                    list[el] = false;

            })
        }

        $scope.clickAll = function(list) {
            Object.keys(list).map(function(el) {
                list[el] = true;
            })
        }

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