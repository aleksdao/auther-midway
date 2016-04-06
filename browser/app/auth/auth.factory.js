'use strict'

app.factory("AuthFactory", function ($http) {
  var factory = {};
  factory.signup = function (user) {
    console.log("making a call in the frontend");
    return $http.post("/signup", user);
  }

  factory.login = function (user) {
    return $http.post("/login", user);
  }

  return factory;
})
