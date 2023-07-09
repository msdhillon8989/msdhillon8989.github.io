// create the module and name it scotchApp
var gameApp = angular.module('gameApp', ['ngRoute','ngMaterial']);

// configure our routes
gameApp.config(function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'pages/dashboard.html',
            controller  : 'dashboardController'
        })
        // route for the about page
        .when('/game', {
            templateUrl : 'pages/app.html',
            controller  : 'gameController'
        })
    ;
});
