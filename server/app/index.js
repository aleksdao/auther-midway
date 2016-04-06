'use strict';

var app = require('express')();
var path = require('path');
var session = require("express-session");
var User = require("../api/users/user.model.js")


app.use(session({
	secret: "tongiscool"
}))



// place right after the session setup middleware
app.use(function (req, res, next) {
    console.log('session', req.session);
    next();
});

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

app.post("/login", function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    email: email,
    password: password
  })
    .then(function (user) {
      console.log(user);
      if (!user) {
        res.sendStatus(401);
      }
      else {
        req.session.userId = user._id;
				var hour = 3600000;
				req.session.cookie.expires = new Date(Date.now() + hour);
				res.sendStatus(200);
      }
    })
    .then(null, next);
})

app.post("/signup", function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  User.create({
    email: email,
    password: password
  })
    .then(function (user) {
      console.log("signing up", user);
        req.session.userId = user._id;
				var hour = 3600000;
				req.session.cookie.expires = new Date(Date.now() + hour);
				res.sendStatus(200);
    })
    .then(null, next);
})

app.post("/logout", function (req, res, next) {
	req.session.userId = null;
	console.log("logging out", req.session);
	res.sendStatus(200);
})

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));

module.exports = app;
