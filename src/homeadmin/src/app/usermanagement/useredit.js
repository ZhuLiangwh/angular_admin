/**
 * Created by jhzhang on 2014/10/9.
 */
define(['./dialog/userRoleDialog','text!./dialog/user-role-dialog.html','./dialog/userGroupDialog','text!./dialog/user-group-dialog.html'],function(userRoleDialogCtrl,userRoleDialogTpl,userGroupDialogCtrl,userGroupDialogTpl){
    var diName = 'UsereditCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope', '$stateParams', '$state', '$modal','$window', 'ds.userlist', UsereditCtrl]);
            return mod;
        }
    }

    function UsereditCtrl($scope, $stateParams, $state,$modal,$window,listDS){
        var getSelected = function(objs){
                var selected = [];
                objs.forEach(function(item){
                    item.selected && (selected.push(item));
                });
                return selected;
            };

        //load department and roles
        listDS.getUserInfo($stateParams).then(function(){
            $scope.user = listDS.data.user;

            listDS.roles = listDS.data.roles;
            //获取选中的roles
            $scope.selectedRoles = getSelected(listDS.roles);
        });


        //删除已选择的roles,这里只需要遍历挂载在listDS服务上的roles，修改selectedRoles即可，因为下面有$watch
        $scope.deleteRole = function(role){
            var selected = [];
            //切换选择
            role.selected = !role.selected;
            //获取已经选中的role
            listDS.roles.forEach(function(item){
                item.selected && (selected.push(item));
            });
            listDS.selectedRoles = selected;
        };

        //watch listDS.selectedRoles的值，即时反馈到$scope.selectedRoles，以实时刷新所选择的role
        $scope.$watch(listDS.getSelectedRoles.bind(listDS),function(value){
            $scope.selectedRoles = value;
        });

        //保存用户
        var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        $scope.createUser = function(){
            var roles = [],groups = [];
            if(!emailReg.test($scope.user.user_name)){
                listDS.logger.error('The E-mail format is incorrect, please check!');
                return;
            }

            //role必选
            if($scope.selectedRoles.length === 0){
                listDS.logger.error('Plesae  select a role!');
                return;
            }

            $scope.selectedRoles.forEach(function(item){
                roles.push(item.value)
            });

            //将department和roles合并到要提交的参数中
            angular.extend($scope.user,{
                "roles":roles
            });

            //提交
            listDS.saveUserInfo($scope.user).then(function(){
                //$state.go('auth.user');
                $window.history.back();
            },function(data){
                listDS.logger.error(data.data.msg || 'save faild.');
            });
        };

        //取消修改
        $scope.cancel = function(){
            $state.go('auth.user');
        };

        //select roles
        $scope.selectRole = function(){
            $scope.userRoleDialog = $modal.open({
                template: userRoleDialogTpl,
                controller: ['$scope', '$modalInstance', 'logger','ds.userlist', userRoleDialogCtrl]
            });
        }
    }
});