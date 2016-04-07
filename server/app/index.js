'use strict';

var app = require('express')();
var path = require('path');
var session = require("express-session");
var User = require("../api/users/user.model.js")
var bodyParser = require("body-parser");
var passport = require("passport");

// app.use(bodyParser.json())

app.use(session({
	secret: "tongiscool"
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/', // or wherever
    failureRedirect : '/' // or wherever
  })
);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: '705949643988-pa5ncmt0qirf6kef9ilor33iovj7vrus.apps.googleusercontent.com',
    clientSecret: 'L42wgvUfM0YCT2ek0DCOfZve',
    callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
  },
	function (token, refreshToken, profile, done) {
		console.log("email-------", profile.emails[0].value)
		User.findOne({
			email: profile.emails[0].value
		})
			.then(function (user) {
				if (user) {
					console.log("existing user")
					return user;
				}
				console.log("creating new user");
				return User.create({
					name: profile.displayName,
					email: profile.emails[0].value,
					photo: profile.photos[0].value,
					isAdmin: true,
					google: {
						id: profile.id,
						token: token,
						name: profile.displayName,
						email: profile.emails[0].value
					}
				})
			})
			.then(function (user) {
				console.log('getting into here', user)
				done(null, user);
			})
	})
)

passport.serializeUser(function (user, done) {
	console.log("who's this user getting serialized", user)
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	console.log("does htis happen. what's id", id)
  User.findById(id, function (err, user) {
		done(err, user);
	});
});

// place right after the session setup middleware
// app.use(function (req, res, next) {
//     console.log('session', req.session);
//     next();
// });

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

app.get("/auth/me", function (req, res, next) {
	console.log("what's the req session here", req.session.passport.user);
	var userId;
	if(req.user) userId = req.user._id;
	else userId = req.session.userId;
	User.findById(userId)
		.then(function (user) {
			console.log("user logged in:", user)
			res.send(user);
		})
		.then(null, next);
})

app.post("/login", function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    email: email,
    password: password
  })
    .then(function (user) {
      if (!user) {
        res.sendStatus(401);
      }
      else {
        req.session.userId = user._id;
				var hour = 3600000;
				req.session.cookie.expires = new Date(Date.now() + hour);
				res.status(200).send(user);
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
        req.session.userId = user._id;
				var hour = 3600000;
				req.session.cookie.expires = new Date(Date.now() + hour);
				res.status(200).json(user);
    })
    .then(null, next);
})

app.post("/logout", function (req, res, next) {
	req.session.userId = null;
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
