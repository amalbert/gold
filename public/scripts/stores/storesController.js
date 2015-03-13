'use strict';

var controllers = angular.module('Controllers');

controllers.controller('StoresController', [ '$scope', '$log', '$timeout', '$location', '$routeParams', 'StoresService',
    function($scope, $log, $timeout, $location, $routeParams, StoresService) {
        if ($location.url() == '/admin/stores/list') {
        	StoresService.list().then(function (data) {
	        	$scope.stores = data;
	        });
        } else if ($location.url().lastIndexOf('/admin/stores/detail', 0) == 0) {
        	var id = $routeParams.id;
        	StoresService.find(id).then(function (data) {
        		$scope.store = data;
        	});
        } else if ($location.url() == '/admin/stores/new') {
            $scope.store = StoresService.newStore();
        }

        $scope.save = function(store) {
        	StoresService.save(store).then(function (data) {
        		$scope.store = data;
        		console.log(data);
        	});
        }

 } ]);