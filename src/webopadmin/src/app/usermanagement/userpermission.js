/**
 * Created by jhzhang on 2014/10/9.
 */
define([],function(){
    var diName = 'UserpermissionCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope','$stateParams', '$state','$window', 'ds.userlist', UserpermissionCtrl]);
            return mod;
        }
    };

    function UserpermissionCtrl($scope, $stateParams,$state, $window, listDS){
        var apiParams = {};
        //get page data
        listDS.getUserPermissions($stateParams).then(function(){
            $scope.feature = listDS.data.feature;
            $scope.permissions = listDS.data.items;
        });

        $scope.submit = function(){
            var permissions = [];
            //遍历module权限
            $scope.permissions.forEach(function(item){
                item.items.forEach(function(per){
                    per.actions.forEach(function(p){
                        p.checked && (permissions.push(p.id));
                    });
                });
            });
            //遍历feature权限
            $scope.feature.items.forEach(function(item){
                item.checked && (permissions.push(item.id));
            });

            //保存修改
            listDS.saveUserPermissions({userid:$stateParams.userid,permissions:permissions}).then(function(){
                //$state.go('auth.user');
                $window.history.back();
            },function(){
                this.logger.error(data.status);
            });
        }
    }
});