'use strict'

app.controller("LoginCtrl", function ($scope, AuthFactory, $state) {
  $scope.login = function () {
    AuthFactory.login($scope.user)
      .then(function (user) {
        $scope.validatedUser = user;
        $state.go("stories");
      })
  }
})
