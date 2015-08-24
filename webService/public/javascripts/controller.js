'use strict';

var calendarController = angular.module('calendarController', []);
var calendarFilters = angular.module('calendarFilters', []);


calendarController.controller('monthCtrl', function($scope, $http, $filter, $location) {
	
    var now = new Date();
    
	$scope.twoDigit = function(num) {
		return ('0' + num).slice(-2);
	}
	
    $scope.getNumber = function(num) {
        return new Array(num);   
    }
    
    var daysInMonth =  new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    $scope.totalDays = parseInt(daysInMonth, 10);
    $scope.nameOfMonth = now.toLocaleString('en-us', { month: 'long' });
    //$scope.date = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
    $scope.yearMonth = now.getFullYear() + '-' + $scope.twoDigit(1+now.getMonth()) + '-';
	
});

calendarController.controller('dayCtrl', function($scope, $http, $filter, $location) {
    $scope.day = $scope.date.split('-').slice(-1)[0].replace(/\b0(?=\d)/g, ''); // Get the day from the date and remove leading 0s
    
    $http.get('/tasks/date/' + $scope.date).
    success(function(data, status, headers, config) {
		$scope.dayTasks = data;
    });
});

calendarController.controller('ViewTaskCtrl', function($scope, $http, $routeParams, $location) {
    $http.get('/tasks/id/' + $routeParams.taskId).
    success(function(data, status, headers, config) {
		$scope.task = data;
    });
});

calendarFilters.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});

