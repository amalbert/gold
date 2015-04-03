'use strict';

var controllers = angular.module('Controllers');

controllers.controller('BourseController', [ '$scope', '$log', '$timeout', '$interval', '$location', '$routeParams', 'BourseService',
    function($scope, $log, $timeout, $interval, $location, $routeParams, BourseService) {

    	function getBourse() {
    		BourseService.find().then(function (bourse) {
	            $scope.bourse = bourse;
	            $scope.bourse.lastUpdatedFormatted = moment($scope.bourse.lastUpdated).format("DD/MM/YYYY à HH:mm:ss");
            });
    	}

    	getBourse();
        if (BourseService.needRefresh()) {
            $interval(function() {
                getBourse();
            }, 5000);
        }

 } ]);