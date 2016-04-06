'use strict';

var router = require('express').Router(),
	morgan = require('morgan');

router.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

module.exports = router;