define(['common/utils/md5'], function (Md5) {
    var diName = 'UserSettingCtrl';
    return {
        __register__: function (mod) {
            mod.config(['dpValidatorProvider',function(dpValidatorProvider){
                dpValidatorProvider.setRule({
                    'password':{
                        'rule':/./,
                        'pattern':'密码格式不正确.'
                    }
                });
            }]);

            mod.controller(diName, ['$scope','session', 'ds.usersetting','dpDialog', UserSettingCtrl]);
            return mod;
        }
    };

    function UserSettingCtrl($scope,session,DS,dpDialog) {

        $scope.getUsername = function(){
            return session.username;
        };

        $scope.changepwd = function(){
            var postData = _.extend({},$scope.user);
            _.each(postData,function(v,k,user){ return user[k] = Md5.hex_md5(v)});
            DS.changepassword(postData).then(function(data){
                DS.logger.success('change success.');
                dpDialog.close();
            },function(error){
                DS.logger.error(error.data.msg || 'change faild.');
            });
        }

    }
});
