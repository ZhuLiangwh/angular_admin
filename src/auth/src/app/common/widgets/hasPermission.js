define(function () {
    var diName = 'hasPermission';
    return {
        __register__: function (mod) {
            mod.directive(diName, ['$state', hasPermission]);
        }
    };

    function hasPermission($state) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                var permiss = $attrs.hasPermission,
                    flag = true,
                    model = $state.current.data.model,
                    permissionsList = _.indexBy(JSON.parse(window.localStorage.getItem('user_session'))['permissions'],'model');

                //可以处理各种组合的情况，比如 (add && edit || !delete)
                if (_.isString(permiss)) {
                    permiss = permiss.replace(/(\w+)/g,function(a){ return 'checkPermission("'+ a +'")'});
                    flag = eval('('+ permiss +')');
                }

                //如果值不是字符串，则当它已经在cotroller里处理完成，直接将它转成布尔型即可
                if(_.isBoolean(permiss)){
                    flag = !!permiss
                }
                //如果没有自处理函数，则默认为隐藏该按钮
                if(_.isFunction($scope.permissionHandler)){
                    $scope.permissionHandler(flag);
                }else{
                    $element[flag ? 'show' : 'hide']();
                }
                function checkPermission(p){
                    return hasPermissions({'model':model,'action':p});
                }
                function hasPermissions(permission){
                    if (!permission || !permission.model || permission.action.length === 0) {
                        return true;
                    }

                    var modelPermissions = permissionsList[permission.model],
                        action = permission.action;
                    if (!modelPermissions) {
                        return true;
                    }
                    return _.contains(modelPermissions.action, action);
                }
            }
        }
    }
});