'use strict';

var controllers = angular.module('Controllers');

controllers.controller('CoinsController', [ '$scope', '$log', '$timeout', '$location', '$interval', '$routeParams', 'CoinsService', 'StoresService', 'BourseService', 'BasketService', 'LocationService',
    function($scope, $log, $timeout, $location, $interval, $routeParams, CoinsService, StoresService, BourseService, BasketService, LocationService) {

        $scope.filterCountry = {};
        $scope.filterStore = {};
        $scope.filterMetal = {};
        $scope.filterWeight = {};

        function getAllData() {
            $scope.lastUpdate = moment(new Date()).format("DD/MM/YYYY à HH:mm:ss");

            BourseService.get().then(function (bourse) {
                $scope.bourse = bourse;

                if (LocationService.isCoinListUrl()) {
                    CoinsService.list(bourse, $scope.filterStore).then(function (data) {
                        $scope.coins = data;
                        BasketService.update($scope.coins);
                    });
                } else if (LocationService.isCoinDetailUrl()) {
                    var id = $routeParams.id;
                    CoinsService.find(id).then(function (data) {
                        $scope.coin = data;
                        $scope.bestStore = CoinsService.findBestStoreForCoin(data, $scope.filterStore);
                        $scope.coin.currentBestPrice = CoinsService.findBestPrice($scope.coin, $scope.filterStore);
                        $scope.coin.currentBestPrime =  $scope.getPrime($scope.coin, $scope.coin.currentBestPrice);
                    });
                }
            });
        }

        $scope.lastUpdate = moment(new Date()).format("DD/MM/YYYY à HH:mm:ss");
        StoresService.list().then(function (data) {
            $scope.stores = data;
            $scope.stores.map(function(store) {
                $scope.filterStore[store.name] = true;
            });

            BourseService.get().then(function (bourse) {
                $scope.bourse = bourse;

                if (LocationService.isCoinListUrl()) {
                    CoinsService.list(bourse, $scope.filterStore).then(function (data) {
                        $scope.coins = data;
                        
                        $scope.filterMetal[$routeParams.metal] = true;

                        $scope.coins.map(function(coin) {
                            if ($routeParams.metal != coin.metal) {
                                return;
                            }
                            $scope.filterCountry[coin.country] = true;
                            $scope.filterWeight[coin.weight] = true;
                        });

                        BasketService.update($scope.coins);
                    });
                } else if (LocationService.isCoinDetailUrl()) {
                    var id = $routeParams.id;
                    CoinsService.find(id).then(function (data) {
                        $scope.coin = data;
                        $scope.bestStore = CoinsService.findBestStoreForCoin(data, $scope.filterStore);
                        $scope.coin.currentBestPrice = CoinsService.findBestPrice($scope.coin, $scope.filterStore);
                        $scope.coin.currentBestPrime =  $scope.getPrime($scope.coin, $scope.coin.currentBestPrice);
                    });
                } else if (LocationService.isCoinNewUrl()) {
                    $scope.coin = CoinsService.newCoin();
                }
            });
        });



        $scope.orderCoins = 'currentBestPrime';

        if (CoinsService.needRefresh()) {
            $interval(function() {
                getAllData();
            }, 10000);
        }

        $scope.addToBasket = function(coin, uri) {
            BasketService.addToBasket(coin, uri);
        };

        $scope.deleteFromBasket = function(pos) {
            BasketService.deleteCoin(pos);
        };

        $scope.updateBasket = function(coin, uri) {
            BasketService.update($scope.coins);
        };

        $scope.getBasket = function() {
            return BasketService.basket;
        };

        $scope.getPrime = function(coin, price) {
            return CoinsService.getPrime(price, $scope.bourse, coin);
        };

        $scope.getStore = function(storeName) {
            for (var i = 0; i <  $scope.stores.length; i++) {
                if ($scope.stores[i].name == storeName)
                    return $scope.stores[i];
            }
        };

        $scope.clickOnly = function(value, list) {
            Object.keys(list).map(function(el) {
                if (value == el) 
                    list[el] = true;
                else
                    list[el] = false;

            });
        };

        $scope.clickAll = function(list) {
            Object.keys(list).map(function(el) {
                list[el] = true;
            })
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
        };

 } ]);