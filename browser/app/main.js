'use strict';

var app = angular.module('auther', ['ui.router', 'angularFileUpload']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
	$urlRouterProvider.when("/auth/:provider", function() {
		window.location.reload();
	})
});
