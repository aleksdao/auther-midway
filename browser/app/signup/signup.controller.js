'use strict'

app.controller("SignupCtrl", function ($scope, AuthFactory, $state) {
  $scope.signup = function () {
    AuthFactory.signup($scope.user)
      .then(function () {
        console.log("we created a user");
        $state.go("stories");
      })
  }
})
