'use strict';

var controllers = angular.module('Controllers');

controllers.controller('CoinsController', [ '$scope', '$log', '$timeout', 'CoinsService',
    function($scope, $log, $timeout, travelService, HotelsService, extraService) {
        
        $scope.list = function() {

        };
        $scope.coinName = 'Krugerrand';

 } ]);