'use strict';
 
var calendarApp = angular.module('calendarApp', [
    'ui.bootstrap',
	'ngRoute',
	'ngResource',
	'calendarController',
	'calendarFilters'
]);

calendarApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
    $routeProvider.
      when('/', {
        templateUrl: '/partials/monthView',
        controller: 'monthCtrl'
      }).
     when('/viewTask/:taskId', {
        templateUrl: '/partials/viewTask',
        controller: 'ViewTaskCtrl'
      }).	 
      otherwise({
        redirectTo: '/'
      });
}]);

calendarApp.directive('dayOfMonth', function(){
	return{
		restrict: 'E',
        scope: {
          date: '@'
        },
		templateUrl: 'partials/day-of-month',
        controller: 'dayCtrl'
	}
});

calendarApp.directive('dayTaskList', function(){
	return{
		restrict: 'E',
        scope: {
          task: '='
        },
		templateUrl: 'partials/day-task-list'
	}
});

