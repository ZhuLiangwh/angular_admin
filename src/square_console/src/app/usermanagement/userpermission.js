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

    function UserpermissionCtrl($scope, $stateParams, $state, $window, listDS){
        var apiParams = {};
        $scope.resource = [];

        listDS.getPermDisplayData().then(function(data){
            var data = data.data.data;
            $scope.feature = data.feature;
            $scope.feature_items = data.feature.items;
            $scope.permissions = data.items;

            //选中状态的数据
            listDS.getUserPermissions($stateParams).then(function(){
                $scope.perm_list = listDS.data.perm_list;
                $scope.disabled = listDS.data.disable_list;

                //设置disable值
                setTimeout(function(){
                    setDisable($scope.feature_items,$scope.disabled)
                    setDisable($scope.permissions,$scope.disabled);
                    $scope.$apply();
                },0);
            });
        },function(){});

        $scope.submit = function(){
            //保存修改
            listDS.saveUserPermissions({userid:$stateParams.userid,perm_list:$scope.perm_list,disable_list:$scope.disabled}).then(function(data){
                $window.history.back();
            },function(error){
                listDS.logger.error(error.msg || 'save faild');
            });
        }

        function setDisable(items,disables){
            disables = disables || [];
            items.forEach(function(item){
                if(_.isArray(item.items)){
                    setDisable(item.items,disables);
                }else{
                    $scope.resource.push(item);
                    disables.indexOf(item.value) > -1 && (item.disabled = true);
                }
            });
        }
    }
});