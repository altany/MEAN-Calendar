'use strict';

var calendarController = angular.module('calendarController', []);
 
calendarController.controller('monthCtrl', function($scope, $http, $filter, $location) {
	
    var now = new Date();
    var daysInMonth =  new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    $scope.days = daysInMonth;
    
	$http.get('/tasks/all').
    success(function(data, status, headers, config) {
		$scope.tasks = data;
    });
	
	
	
  });