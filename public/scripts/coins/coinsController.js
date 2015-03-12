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

            if ($location.url() == '/coins/list') {
            	CoinsService.list().then(function (data) {
            		$scope.coins = data;
                    //$scope.coinsBycountries = {};
                    $scope.coins.map(function(coin) {
                       /* if ($scope.coinsBycountries[coin.country] === undefined) {
                            $scope.coinsBycountries[coin.country] = [];*/
                            $scope.filterCountry[coin.country] = true;
                            $scope.filterMetal[coin.metal] = true;
                            $scope.filterWeight[coin.weight] = true;
                            coin.bestPrice = CoinsService.findBestPrice(coin);
                            if (coin.metal === 'Or') {
                                coin.prime = Math.round(CoinsService.getPrime(coin.bestPrice, bourse.gold.current, coin.weight) * 1000) / 10;
                            } else if (coin.metal === 'Argent') {
                                coin.prime = Math.round(CoinsService.getPrime(coin.bestPrice, bourse.silver.current, coin.weight) * 1000) / 10;
                            }
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
        });

        $scope.orderCoins = 'prime';

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