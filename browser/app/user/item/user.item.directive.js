'use strict';

app.directive('userItem', function () {
	return {
		restrict: 'E',
		templateUrl: '/browser/app/user/item/user.item.html',
		scope: {
			user: '=model',
			glyphicon: '@',
			iconClick: '&'
		},
		link: function (scope, elem, attrs) {
			if (attrs.hasOwnProperty('isForm')) scope.isForm = true;
			if (attrs.hasOwnProperty('iconClick')) scope.hasIconClick = true;
			if (!scope.isForm) {
				var hasInitialized = false;
				scope.$watch('user', function () {
					if (!hasInitialized) hasInitialized = true;
					else scope.user.save();
				}, true);
			}
			scope.removeUser = function () {
				scope.user.destroy().then(function () {
					scope.user.isDestroyed = true;
				});
			};
		}
	}
});