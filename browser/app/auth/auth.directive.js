app.directive("authDirective", function () {
  return {
    scope: {
      signIn: "=",
      user: "="
    },
    templateUrl: "/browser/app/auth/auth.html"
  }
})
