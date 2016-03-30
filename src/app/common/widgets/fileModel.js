define(function() {
  var diName = 'fileModel';
  return {
    __register__: function(mod) {
      mod.directive(diName, ['$parse', fileModel]);
      return mod;
    }
  };

  function fileModel($parse) {
    return {
      restrict: 'A',
      scope:{
        onChanged: '&'
      },
      link: function($scope, $element, attrs) {
        $element.bind('change', function() {
          $scope.onChanged({
            node:{
              modelName: attrs.fileModel,
              fileInfo: $element[0].files[0]
            }
          });
        });
      }
    };
  }
});
