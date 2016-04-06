'use strict'; 

var mongoose = require('mongoose'),
	shortid = require('shortid');

var db = require('../../db');

var Story = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: shortid.generate
	},
	__v: {
		type: Number,
		select: false
	},
	author: {
		type: String,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true,
		unique: true
	},
	paragraphs: [String]
});

module.exports = db.model('Story', Story);