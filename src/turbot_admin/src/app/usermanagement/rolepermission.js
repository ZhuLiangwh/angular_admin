/**
 * Created by jhzhang on 2014/10/9.
 */
define([],function(){
    var diName = 'RolePermissionCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope','$state', '$stateParams','ds.role', RolePermissionCtrl]);
            return mod;
        }
    }

    function RolePermissionCtrl($scope, $state, $stateParams,RoleDS){
        //get page data
        RoleDS.getRolePermissions($stateParams).then(function(){
            $scope.feature = RoleDS.data.feature;
            $scope.permissions = RoleDS.data.items;
        });

        $scope.submit = function(){
            var permissions = [],data;
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
            data = angular.extend($stateParams,{permissions:permissions});
            RoleDS.saveRolePermissions(data).then(function(){
                $state.go('auth.groups');
            },function(){
                this.logger.error(data.status);
            });
        }
    }
});