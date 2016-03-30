/**
 * Created by jhzhang on 2014/10/9.
 */
define([],function(){
    var diName = 'RolePermissionCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope','$state', '$stateParams','$window','ds.role', RolePermissionCtrl]);
            return mod;
        }
    }

    function RolePermissionCtrl($scope, $state, $stateParams,$window, RoleDS){
        $scope.resource = [];
        RoleDS.getPermDisplayData().then(function(data){
            var data = data.data.data;
            $scope.feature = data.feature;
            $scope.feature_items = data.feature.items;
            $scope.permissions = data.items;

            //选中状态的数据
            RoleDS.getRolePermissions($stateParams).then(function(){
                $scope.perm_list = RoleDS.data.perm_list;
             });
        },function(){});


        $scope.submit = function(){
            //保存修改
            RoleDS.saveRolePermissions({roleid:$stateParams.roleid,perm_list:$scope.perm_list}).then(function(data){
                console.log(data);
                $window.history.back();
            },function(error){
                RoleDS.logger.error(error.msg || 'save faild');
            });
        }

    }
});