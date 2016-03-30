/**
 * Created by jhzhang on 2014/10/9.
 */
define(['text!../layouts/confirm-dialog.html'],function(confirmDialogTpl){
    var diName = 'RolesUserListCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope','$state', '$stateParams', 'ngTableParams', 'ds.role','dpDialog', 'PER_PAGE', RolesUserListCtrl]);
            return mod;
        }
    };

    function RolesUserListCtrl($scope,  $state, $stateParams, ngTableParams, roleDS, dpDialog, PER_PAGE){
        $scope.roleUserListParams = new ngTableParams({
            page: 1,
            count: PER_PAGE
        }, {
            isCurrent: function(page, params) {
                return page.number === params.page() && page.type !== 'prev' && page.type !== 'next';
            },
            getData: function($defer, params) {
                roleDS.getRoleUserList($stateParams).then(function() {
                    var items  = roleDS.data.items;

                    $scope.items = items.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(items.length);
                    $defer.resolve($scope.items);
                });
            }
        });


        //edit user
        $scope.edit = function(item){
            $state.go('auth.useredit',{userid:item.id});
        };


        //disable user
        $scope.disable = function(item){
            dpDialog.confirm({
                content:'Are you sure to ' + (item.is_active ? "'Disable'?" : "'Enable'?")
            },function(f){
                if(f){
                    item.is_active = !item.is_active;
                    roleDS.disable(item);
                }
            })
        };

        //view user
        $scope.viewDetail = function(item){
            $state.go('auth.userpermission',{userid:item.id});
        };
    }
});