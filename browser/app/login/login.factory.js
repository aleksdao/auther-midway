'use strict'

app.factory("LoginFactory", function ($http) {
  var factory = {};
  factory.login = function (user) {
    return $http.post("/login", user);
  }

  return factory;
})
