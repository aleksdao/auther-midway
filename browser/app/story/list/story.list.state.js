'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('stories', {
		url: '/stories',
		templateUrl: '/browser/app/story/list/story.list.html',
		controller: 'StoryListCtrl',
		resolve: {
			stories: function (Story) {
				return Story.fetchAll();
			},
			users: function (User) {
				return User.fetchAll();
			}
		}
	});
});