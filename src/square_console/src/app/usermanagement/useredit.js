/**
 * Created by jhzhang on 2014/10/9.
 */
define(['./dialog/userRoleDialog','text!./dialog/user-role-dialog.html','./dialog/userGroupDialog','text!./dialog/user-group-dialog.html'],function(userRoleDialogCtrl,userRoleDialogTpl,userGroupDialogCtrl,userGroupDialogTpl){
    var diName = 'UsereditCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope', '$q', '$stateParams', '$state', '$modal', 'ds.userlist','$window', UsereditCtrl]);
            return mod;
        }
    }

    function UsereditCtrl($scope, $q, $stateParams, $state,$modal,listDS,$window){

        $scope.entity = {};
        getDisplayData().then(function(){
            //load department and roles
            listDS.getUserInfo($stateParams).then(function(data){
                $scope.entity = data.data.data;
            });
        },function(){});


        //保存用户
        var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        $scope.createUser = function(){
            var roles = [],groups = [];
            if(!emailReg.test($scope.entity.user_name)){
                listDS.logger.error('The E-mail format is incorrect, please check!');
                return;
            }

            //role必选
            if($scope.entity['group_id'].length === 0){
                listDS.logger.error('Plesae  select a role!');
                return;
            }


            //提交
            listDS.saveUserInfo($scope.entity).then(function(data){
                $window.history.back();
            },function(data){
                listDS.logger.error(data.msg || 'save faild.');
            });
        };

        //取消修改
        $scope.cancel = function(){
            $state.go('auth.user');
        };


        function getDisplayData(){
            var defer = $q.defer();
            listDS.getDisplayData().then(function (data) {
                var data = data.data.data;
                $scope.roles = data.roles.items;
                defer.resolve(data);
            },function(error){
                defer.reject(error);
            });
            return defer.promise;
        }
    }
});