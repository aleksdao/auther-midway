'use strict'

app.factory("AuthFactory", function ($http) {
  var validatedUser;
  var factory = {};
  factory.signup = function (user) {
    return $http.post("/signup", user)
      .then(function (response) {
        validatedUser = response.data;
        return validatedUser;
      });
  }

  factory.login = function (user) {
    return $http.post("/login", user)
      .then(function (response) {
        validatedUser = response.data;
        console.log(validatedUser);
        return validatedUser;
      });
  }

  factory.checkSessionForUser = function() {
    return $http.get("/auth/me")
      .then(function (response) {
        validatedUser = response.data;
        return validatedUser;
      })
  }

  factory.getValidatedUser = function () {
    return $http.get("/auth/me")
      .then(function (response) {
        validatedUser = response.data;
        return validatedUser;
      })
  }

  return factory;
})
