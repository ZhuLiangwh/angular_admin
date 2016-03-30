/**
 * Created by jhzhang on 2014/10/9.
 */
define([],function(){
    var diName = 'CreateuserCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope','$q','$state','$modal','ds.userlist','$window',CreateuserCtrl]);
            return mod;
        }
    };

    function CreateuserCtrl($scope,$q,$state,$modal,listDS,$window){
        getDisplayData();

        //创建用户
        var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        $scope.createUser = function(){

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
            listDS.createUser($scope.entity).then(function(data){
                $window.history.back();
            },function(data){
                listDS.logger.error(data.msg || 'save faild.');
            });
        };

        //取消创建
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