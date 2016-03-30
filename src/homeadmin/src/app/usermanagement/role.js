/**
 * Created by jhzhang on 2014/10/9.
 */
define(['text!../layouts/confirm-dialog.html'],function(confirmDialogTpl){
    var diName = 'RoleCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope', '$state', 'ngTableParams', 'ds.role', 'PER_PAGE', '$modal', 'dpErrorHandler',RoleCtrl]);
            return mod;
        }
    };

    function RoleCtrl($scope, $state,  ngTableParams, listDS, PER_PAGE, $modal, dpErrorHandler){
        var apiParams = {},tempVal='';

        $scope.roleParams = new ngTableParams({
            page: 1,
            count: PER_PAGE
        }, {
            isCurrent: function(page, params) {
                return page.number === params.page() && page.type !== 'prev' && page.type !== 'next';
            },
            getData: function($defer, params) {
                listDS.getData(apiParams).then(function() {
                    var items = listDS.data.items;
                    $scope.items = items.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(items.length);
                    $defer.resolve($scope.items);
                });
            }
        });


        $scope.blur = function(item){
            item.isEdit = false;
            //如果输入框中的内容和原始内容不相同，则提示notSave
            item.notSave = item.role_name !== item.origin;
        };
        $scope.focus = function(item){
            item.isEdit = true;
            tempVal = item.role_name;
        };
        //edit role
        $scope.edit = function(item){
            item.isEdit = true;
            tempVal = item.role_name;
        };

        //save role
        $scope.save = function(item){
            //恢复至初始状态
            item.isEdit = false;
            item.notSave = false;
            //如果数据没有被修改过
            if(item.role_name === item.origin){
                listDS.logger.success('No content edit!');
                return;
            }
            //注意这句的作用是为了以最快的时间更新origin，因为save的触发事件是mousedown，
            //它会先于上面的blur事件监听函数执行，这样就会导致item.notSave的状态不正确
            item.origin = item.role_name;
            //保存修改
            listDS.save(item).then(function(data){},function(error){
                item.origin = item.role_name = tempVal;
                listDS.logger.error(error.data.msg || 'Modify faild.')
            });
        };

        var ErrorHand= new dpErrorHandler();

        //del role
        $scope.del = function(item,index){
            $modal.open({
                template: confirmDialogTpl,
                scope:$scope,
                controller: ['$scope', '$modalInstance',function($scope,$modalInstance){
                    $scope.title = 'Confirm';
                    $scope.content ='Are you sure to delete?';
                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.confirm = function(){
                        listDS.del({"gids":[item.id]}).then(function(){
                            $scope.items.splice(index,1);
                            listDS.logger.success('delete success');
                        },function(error){
                            ErrorHand.show(error);
                        });
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };

        //add role
        $scope.addRole = function(role){
            listDS.addRole({"rolename":role}).then(function(data){
                $scope.items.push(data.data.data);
                $scope.newrolename = '';
            },function(data){
                listDS.logger.error(data.status);
            });
        };

        //view users
        $scope.viewUser = function(item){
            $state.go('auth.roleuserlist',{roleid:item.id});
        };

        //view Permissions
        $scope.viewPermissions = function(item){
            $state.go('auth.rolepermission',{roleid:item.id});
        };
    }
});