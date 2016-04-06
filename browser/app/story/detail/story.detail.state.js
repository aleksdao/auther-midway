'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('story', {
		url: '/stories/:id',
		templateUrl: '/browser/app/story/detail/story.detail.html',
		controller: 'StoryDetailCtrl',
		resolve: {
			story: function (Story, $stateParams) {
				var story = new Story({_id: $stateParams.id});
				return story.fetch();
			},
			users: function (User) {
				return User.fetchAll();
			}
		}
	});
});