'use strict';

var mongoose = require('mongoose'),
	shortid = require('shortid'),
	_ = require('lodash');

var db = require('../../db');
var Story = require('../stories/story.model');

var User = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: shortid.generate
	},
	name: String,
	photo: {
		type: String,
		default: '/images/default-photo.jpg'
	},
	phone: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
});

User.methods.getStories = function () {
	return Story.find({author: this._id}).exec();
};

module.exports = db.model('User', User);
