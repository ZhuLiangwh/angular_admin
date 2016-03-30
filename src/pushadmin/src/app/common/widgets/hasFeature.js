define(function () {
    var diName = 'hasFeature';
    return {
        __register__: function (mod) {
            mod.directive(diName, [hasFeature]);
        }
    };

    function hasFeature() {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                var feature = $attrs.hasFeature,
                    flag = true,
                    featureList = JSON.parse(window.localStorage.getItem('user_session'))['features'];

                //可以处理各种组合的情况，比如 (add && edit || !delete)
                if (_.isString(feature)) {
                    feature = feature.replace(/([\w-]+)/g,function(a){ return 'checkFeature("'+ a +'")'});
                    flag = eval('('+ feature +')');
                }

                //如果值不是字符串，则当它已经在cotroller里处理完成，直接将它转成布尔型即可
                if(_.isBoolean(feature)){
                    flag = !!feature
                }

                //如果没有自处理函数，则默认为隐藏该按钮
                if(_.isFunction($scope.featureHandler)){
                    $scope.featureHandler(flag);
                }else{
                    $element[flag ? 'show' : 'hide']();
                }

                function checkFeature(item){
                    return  _.contains(featureList, item);
                }
            }
        }
    }
});