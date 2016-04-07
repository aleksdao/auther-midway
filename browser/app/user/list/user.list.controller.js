'use strict';

app.controller('UserListCtrl', function ($scope, users, User, validatedUser) {
	$scope.users = users;
	$scope.validatedUser = validatedUser;

	$scope.addUser = function () {
		$scope.userAdd.save()
		.then(function (user) {
			$scope.userAdd = new User();
			$scope.users.unshift(user);
		});
	};


	$scope.userSearch = new User();

	$scope.userAdd = new User();
});
