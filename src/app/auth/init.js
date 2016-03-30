define([], function () {
    var diName = 'InitCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope','$location', InitCtrl]);
        }
    };

    function InitCtrl($scope, $location) {
        var absUrl = $location.absUrl();

        $scope.setProjectUrl = function(project){
            $scope.src = project['cacheUrl'] || absUrl.replace(/#.+/,project.value +'/src/index.html');
        };
    }
});
