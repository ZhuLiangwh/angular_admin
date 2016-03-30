define(function () {
    var diName = 'dpHighChart';
    return {
        __register__: function (mod) {
            mod.directive(diName, DpHighchart);
        }
    };

    function DpHighchart() {
        return {
            restrict: 'EA',
            scope: {
                chartConfig: "="
            },
            link: function ($scope, $element, $attr) {
                $scope.$watch('chartConfig', function (newValue, oldValue) { 
                     if (newValue){
                        $element.highcharts($scope['chartConfig']);
                         $scope.chartConfig = null;
                    }
                });
            }
        }

    }
});