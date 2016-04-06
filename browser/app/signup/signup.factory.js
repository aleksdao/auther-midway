'use strict'

app.factory("SignupFactory", function ($http) {
  var factory = {};
  factory.signup = function (user) {
    console.log("making a call in the frontend");
    return $http.post("/signup", user);
  }

  return factory;
})
