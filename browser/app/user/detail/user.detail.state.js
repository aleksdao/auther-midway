'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('user', {
		url: '/users/:id',
		templateUrl: '/browser/app/user/detail/user.detail.html',
		controller: 'UserDetailCtrl',
		resolve: {
			user: function (User, $stateParams) {
				var user = new User({_id: $stateParams.id});
				return user.fetch();
			}
		}
	});
});