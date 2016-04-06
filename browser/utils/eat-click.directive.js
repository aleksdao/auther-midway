'use strict';

app.directive('eatClick', function () {
	return {
		restrict: 'A',
		link: function (scope, element) {
			element.on('click', function () {
				return false;
			});
		}
	};
});