'use strict';
 
var calendarApp = angular.module('calendarApp', [
    'ui.bootstrap',
	'ui.bootstrap.datepicker',
	'ui.bootstrap.timepicker',
	'ui.bootstrap.datetimepicker',
	'ngRoute',
	'ngResource',
	'calendarController',
	'calendarFilters'
]);

calendarApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
	var currentMonth = new Date().getMonth() +1;
	var currentYear = new Date().getFullYear();
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
    $routeProvider.
      when('/month/:year/:month', {
        templateUrl: '/partials/monthView',
        controller: 'monthCtrl'
      }).
	 when('/viewTask/new/:date', {
        templateUrl: '/partials/viewTask',
        controller: 'ViewTaskCtrl'
      }).
     when('/viewTask/:taskId', {
        templateUrl: '/partials/viewTask',
        controller: 'ViewTaskCtrl'
      }).
      otherwise({
        redirectTo: '/month/' + currentYear + '/' + currentMonth
      });
}]);

calendarApp.directive('dayOfMonth', ['$window', function($window){
	return{
		restrict: 'E',
        scope: {
          date: '@'
        },
		templateUrl: '/partials/day-of-month',
        controller: 'dayCtrl',
		link: function (scope, element) {
			element.parent().on('click', function(event) {
				if (event.target.tagName != 'A' && event.target.tagName != 'LI') {
					if(monthData && monthData[scope.date] && monthData[scope.date][0]){
						$window.location.href = monthData[scope.date][0].jenkins_build_link;
					}
					else {
						alert("No Build Available");
					}
				}
				

			});
		}
	}
}]);

calendarApp.directive('dayTaskList', function(){
	return{
		restrict: 'E',
        scope: {
          task: '='
        },
		templateUrl: '/partials/day-task-list'
	}
});

