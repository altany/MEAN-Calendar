'use strict';

var calendarController = angular.module('calendarController', []);
var calendarFilters = angular.module('calendarFilters', []);
var monthData;

calendarController.controller('monthCtrl', function($scope, $http, $routeParams, $filter, $location) {
	
	$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    
	$scope.twoDigit = function(num) {
		return ('0' + num).slice(-2);
	}
	
    $scope.getNumber = function(num) {
		if (num<0) num=0;
        return new Array(num);
    }
    
	//Will be used to send in rest api
	$scope.currentMonth = $routeParams.month;
	$scope.currentYear = $routeParams.year;
	
	$scope.firstDay = new Date($scope.currentYear, $scope.currentMonth - 1, 1).getDay();
	$scope.firstDay =($scope.firstDay==0)?7:$scope.firstDay;
	$scope.remainingDays = 7 - (new Date($scope.currentYear, $scope.currentMonth, 0).getDay());
	$scope.remainingDays = ($scope.remainingDays>6)?0:$scope.remainingDays;
	
    var daysInMonth =  new Date($routeParams.year, $routeParams.month, 0).getDate();
    $scope.totalDays = parseInt(daysInMonth, 10);
    $scope.yearMonth = $routeParams.year + '-' + $scope.twoDigit($routeParams.month) + '-';
    
    $http.get('http://localhost:3000/build/all?month=11&year=2018').
        then(function(response) {
            /*$scope.greeting = response.data;
            monthData= {
            	"2018-11-19":
	            [
	            	{
            			"build_no": 310166,
            			"status": "Success",
		            	"report_link": "http://byoos-nfs.rch.kstart.ibm.com/katalon-reports/310164",
		            	"jenkins_build_link": "https://orpheus-jenkins.swg-devops.com:8443/job/cam-bvt-pipeline/310164"
            		}
		        ],
		        "2018-11-20":
	            [
		            {
		            	"build_no": 310165,
		            	"status": "Unstable",
		            	"report_link": "http://byoos-nfs.rch.kstart.ibm.com/katalon-reports/310165",
		            	"jenkins_build_link": "https://orpheus-jenkins.swg-devops.com:8443/job/cam-bvt-pipeline/310165"
		            },
		            {	
		            	"build_no": 310166,
		            	"status": "Failed",
		            	"report_link": "http://byoos-nfs.rch.kstart.ibm.com/katalon-reports/310166",
		            	"jenkins_build_link": "https://orpheus-jenkins.swg-devops.com:8443/job/cam-bvt-pipeline/310166"
		            }
		        ]
            };*/
            monthData = response.data;
            var i;
            for (i = 1; i <= $scope.totalDays; i++) { 
                var element = document.getElementById("day-" + i)
                var key = $scope.currentYear + "-" + $scope.currentMonth + "-" + i;
                var buildArr = monthData[key];
                if(buildArr && buildArr.length>0){
                	 var j;
                	 for(j=0; j<buildArr.length; j++){
                		 //Todo: 1. create capsules for each build  && 2. Beautify the page
                		 
                		 if(buildArr[j].status === "Success") {
                			 element.style["background-color"] = "green";
                		 }
                		 else if(buildArr[j].status === "Unstable") {
                			 element.style["background-color"] = "yellow";
                		 }
                		 else {
                			 element.style["background-color"] = "red";
                		 }
                	 }
                }
            }
        });
	
});

calendarController.controller('dayCtrl', function($scope, $http, $filter, $location) {
    $scope.day = $scope.date.split('-').slice(-1)[0].replace(/\b0(?=\d)/g, ''); // Get the day from the date and remove leading 0s
    
    /*$http.get('/tasks/date/' + $scope.date).
    success(function(data, status, headers, config) {
		$scope.dayTasks = data;
    });*/
    /*$http.get('http://rest-service.guides.spring.io/greeting').
        then(function(response) {
            $scope.greeting = response.data;
            var element = document.getElementById("day-" + $scope.day)
            element.style["background-color"] = "green";
    });*/
    
});

calendarController.controller('ViewTaskCtrl', function($scope, $http, $routeParams, $location) {

    $scope.newUser = '';
	
    $http.get('/tasks/id/' + $routeParams.taskId).
    success(function(data, status, headers, config) {
		$scope.task = data;
    });
	
	$scope.todoSave = function (form) {
		if (form.$valid){
			if (typeof $routeParams.date !=='undefined') {
				$http.post('/tasks/new/', $scope.task).
				success(function(data, status, headers, config) {
					$location.path('/');
				});
			}
			else {
				$http.put('/tasks/'+$routeParams.taskId, $scope.task).
					success(function(data, status, headers, config) {
					$location.path('/');
				});
			}		
		}
    };
	
//	$scope.timeOptions = {
//		showMeridian: false
//	};
//	
//	// For the datepicker
//	$scope.open = function($event, el) {
//		$event.preventDefault();
//		$event.stopPropagation();
//		$scope.opened = [];
//		$scope.opened[el] = true;
//	 };
});

calendarFilters.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});

