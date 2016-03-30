define([], function() {
  var diName = 'BodyCtrl';
  return {
    __register__: function(mod) {
      mod.controller(diName, ['$scope', 'authenticator', '$modal', BodyCtrl]);
      return mod;
    }
  };

  function BodyCtrl($scope, authenticator, $modal) {
    $scope.isLogin = authenticator.isLogin;
    top === window && (top.$modal = $modal);
  }
});
