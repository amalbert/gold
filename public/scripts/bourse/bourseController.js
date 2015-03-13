'use strict';

var controllers = angular.module('Controllers');

controllers.controller('BourseController', [ '$scope', '$log', '$timeout', '$location', '$routeParams', 'BourseService',
    function($scope, $log, $timeout, $location, $routeParams, BourseService) {

        BourseService.find().then(function (bourse) {
            $scope.bourse = bourse;
            $scope.bourse.lastUpdatedFormatted = moment($scope.bourse.lastUpdated).format("DD/MM/YYYY à HH:mm:ss");
        });

 } ]);