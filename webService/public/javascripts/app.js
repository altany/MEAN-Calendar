'use strict';
 
var calendarApp = angular.module('calendarApp', [
    'ui.bootstrap',
	'ngRoute',
	'ngResource',
	'calendarController'
	//'todoFilters'
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
     /* when('/todo/:taskId', {
        templateUrl: '/partials/taskView',
        controller: 'TaskViewCtrl'
      }).*/
	 
      otherwise({
        redirectTo: '/'
      });
}]);