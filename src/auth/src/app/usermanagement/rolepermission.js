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

    function RolePermissionCtrl($scope, $state, $stateParams,$window, listDS){
        $scope.resource = [];
        $scope.projects = [];
        $scope.current = null;
        $scope.perms = [];

        //获取项目名称
        listDS.getProjectName({}).then(function(data){
            $scope.projects = data.data.data.navigate;
            $scope.toggleProject(0);
        });
        //切换选项卡
        $scope.toggleProject = function (index){
            //设置当前状态
            $scope.current = index;
            //显示内容
            //如果没有缓存内容
            if(!$scope.perms[index]){
                //获取内容
                listDS.getPermDisplayData({'project':$scope.projects[index],'roleid':$stateParams.roleid}).then(function(data){
                    var perm = $scope.perms[index] = data.data.data;
                    //选中状态的数据
                    listDS.getRolePermissions({'project':$scope.projects[index],'roleid':$stateParams.roleid}).then(function(data){
                        perm['perm_list'] = listDS.data.perm_list;
                        perm['disabled'] = listDS.data.disable_list;
                        perm['resource'] = [];
                        perm['projectname'] = $scope.projects[index]['value'];
                        //设置disable值
                        setTimeout(function(){
                            setDisable(perm['feature']['items'],perm['disabled'],perm['resource']);
                            setDisable(perm['items'],perm['disabled'],perm['resource']);
                            $scope.$apply();
                        },0);
                    });
                },function(){});
            }
        };

        $scope.submit = function(){
            //保存修改
            var perm = $scope.perms[$scope.current],pro = $scope.projects[$scope.current];
            listDS.saveRolePermissions({roleid:$stateParams.roleid,project:pro,perm:perm}).then(function(data){
                $window.history.back();
            },function(error){
                listDS.logger.error(error.msg || 'save faild');
            });
        };

        function setDisable(items,disables,re){
            disables = disables || [];
            items.forEach(function(item){
                if(_.isArray(item.items)){
                    setDisable(item.items,disables,re);
                }else{
                    re.push(item);
                    disables.indexOf(item.value) > -1 && (item.disabled = true);
                }
            });
        }
    }
});