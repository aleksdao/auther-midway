'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, AuthFactory) {
	$scope.story = story;
	$scope.users = users;
	AuthFactory.getValidatedUser()
		.then(function (user) {
			$scope.validatedUser = user;
		})
	$scope.$watch('story', function () {
		$scope.story.save();
	}, true);
});
