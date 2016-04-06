'use strict';

app.factory('Story', function ($http) {
	function Story (props) {
		angular.extend(this, props);
	}

	Story.url = '/api/stories/';

	Story.prototype.getUrl = function () {
		return Story.url + this._id;
	};

	Story.prototype.isNew = function () {
		return !this._id
	};

	Story.prototype.fetch = function () {
		return $http.get(this.getUrl())
		.then(function (res) {
			return new Story(res.data);
		});
	};

	Story.fetchAll = function () {
		return $http.get(Story.url)
		.then(function (res) {
			return res.data.map(function (obj) {
				return new Story(obj);
			});
		});
	};

	Story.prototype.save = function () {
		var verb;
		var url;
		if (this.isNew()) {
			verb = 'post';
			url = Story.url;
		} else {
			verb = 'put';
			url = this.getUrl();
		}
		return $http[verb](url, this)
		.then(function (res) {
			return new Story(res.data);
		});
	};

	Story.prototype.destroy = function () {
		return $http.delete(this.getUrl());
	};

	return Story;
});