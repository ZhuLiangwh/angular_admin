/**
 * Created by jhzhang on 2014/10/9.
 */
define(['text!../layouts/confirm-dialog.html'],function(confirmDialogTpl){
    var diName = 'RolesUserListCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope','$state', '$stateParams', 'ngTableParams', 'ds.role','$modal', 'PER_PAGE', RolesUserListCtrl]);
            return mod;
        }
    };

    function RolesUserListCtrl($scope,  $state, $stateParams, ngTableParams, roleDS, $modal, PER_PAGE){
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
            $modal.open({
                template: confirmDialogTpl,
                scope:$scope,
                controller: ['$scope', '$modalInstance',function($scope,$modalInstance){
                    $scope.title = 'Confirm';
                    $scope.content ='Are you sure to ' + (item.is_active ? "'Disable'?" : "'Enable'?");
                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.confirm = function(){
                        item.is_active = !item.is_active;
                        roleDS.disable(item);
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };

        //view user
        $scope.viewDetail = function(item){
            $state.go('auth.userpermission',{userid:item.id});
        };
    }
});