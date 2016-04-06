'use strict';

var express = require('express'),
	router = express.Router(),
	path = require('path');

var rootPath = path.join(__dirname, '..', '..');

var publicPath = path.join(rootPath, 'public');

router.use(express.static(publicPath));

router.use(express.static(rootPath));

module.exports = router;