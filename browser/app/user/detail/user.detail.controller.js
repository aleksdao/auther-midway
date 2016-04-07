'use strict';

app.controller('UserDetailCtrl', function ($scope, user, Story, FileUploader, validatedUser) {
	$scope.user = user;
	$scope.validatedUser = validatedUser;

	$scope.newStory = new Story({author: $scope.user});
	$scope.addStory = function () {
		$scope.newStory.save()
		.then(function (story) {
			$scope.newStory = new Story({author: $scope.user});
			$scope.user.stories.unshift(story);
		});
	};
	$scope.removeStory = function (story) {
		story.destroy()
		.then(function () {
			var idx = $scope.user.stories.indexOf(story);
			$scope.user.stories.splice(idx, 1);
		});
	};

	$scope.uploader = new FileUploader();

});
