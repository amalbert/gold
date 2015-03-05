'use strict';

var controllers = angular.module('Controllers');

controllers.controller('StoresController', [ '$scope', '$log', '$timeout', '$location', '$routeParams', 'StoresService',
    function($scope, $log, $timeout, $location, $routeParams, StoresService) {
        if ($location.url() == '/stores/list') {
        	console.log('/stores/list');
        	StoresService.list().then(function (data) {
	        	$scope.stores = data;
	        });
        } else if ($location.url().lastIndexOf('/stores/detail', 0) == 0) {
        	console.log('/stores/detail');
        	var id = $routeParams.id;
        	StoresService.find(id).then(function (data) {
        		$scope.store = data;
        	});
        } else if ($location.url() == '/stores/new') {
        	console.log('/stores/new');
            $scope.store = StoresService.newStore();
        }

        $scope.save = function(store) {
        	StoresService.save(store).then(function (data) {
        		$scope.store = data;
        		console.log(data);
        	});
        }

 } ]);