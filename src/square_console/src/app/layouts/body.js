define([], function () {
    var diName = 'BodyCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', '$state', 'DEFAULT_STATE', '$modal', BodyCtrl]);
            return mod;
        }
    };

    function BodyCtrl($scope, $state, DEFAULT_STATE, $modal) {
        top === window && (top.$modal = $modal);
        $state.go(DEFAULT_STATE);
    }
});
