'use strict';

var controllers = angular.module('Controllers');

controllers.controller('StoresController', [ '$scope', '$log', '$timeout', 'StoresService',
    function($scope, $log, $timeout, StoresService) {
        
        $scope.list = function() {

        };
        StoresService.list(function(data) {
        	$scope.stores = data;
        }, function(error) {});

 } ]);