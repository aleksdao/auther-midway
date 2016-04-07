'use strict'

app.controller("SignupCtrl", function ($scope, AuthFactory, $state) {
  $scope.signup = function () {
    AuthFactory.signup($scope.user)
      .then(function (user) {
        console.log("we created a user");
        $scope.validatedUser = user;
        $state.go("stories");
      })
  }
})
