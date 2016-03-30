/**
 * Created by jhzhang on 2014/10/9.
 */
define(['common/utils/dataConverter','text!../layouts/confirm-dialog.html'],function(dataConverter,confirmDialogTpl){
    var diName = 'UserlistCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope','$filter', '$state', 'cache', 'ngTableParams', 'ds.userlist','$modal', 'PER_PAGE', UserlistCtrl]);
            return mod;
        }
    };

    function UserlistCtrl($scope, $filter , $state,  cache, ngTableParams, listDS,  $modal,PER_PAGE){
        var apiParams = {},cacheParams = cache.get('userSession');
        var findObjIndex = function(arr,key){
            for(var i= 0,len=arr.length; i<len;i++){
                if(arr[i].value === key) return i;
            }
            return 0;
        };
        $scope.filter = {};
        $scope.filterParmas = {
            'user_name':cacheParams.user_name || '',
            'role':cacheParams.role || ''
        };
        var filterHandler = function(item){
            //All选项的值为''
            return $scope.filter.role.value === '' ? true : item['role'].indexOf($scope.filter.role.value) > -1;
        };

        $scope.allItems = [];

        $scope.transTableParams = new ngTableParams({
            page: 1,
            count: PER_PAGE,
            filter: $scope.filterParmas
        }, {
            isCurrent: function(page, params) {
                return page.number === params.page() && page.type !== 'prev' && page.type !== 'next';
            },
            getData: function($defer, params) {
                var paginate = function(items) {
                    var orderedData = params.filter ?  $filter('filter')(items,filterHandler) : items;
                    var pageIndex = cacheParams.page || params.page();
                    $scope.items = orderedData.slice((pageIndex - 1) * params.count(), pageIndex * params.count());
                    params.total(orderedData.length);
                    $defer.resolve(items);
                };

                //设置缓存参数，如过滤条件和当前页数,注意不要把page extend到$scope.filterParmas上,
                //否则没有满足条件的数据，所以这里需要一个{}
                cache.set({'userSession': _.extend({},$scope.filterParmas,{'page':params.page()})});

                if($scope.allItems.length > 0){
                    paginate($scope.allItems);
                    return;
                }
                listDS.getUserList(apiParams).then(function() {
                    $scope.allItems = listDS.data.items;
                    $scope.filterRoles = listDS.data.filters.roles;

                    //设置select框的默认值，如果有缓存数据的话，设为缓存，否则为第一个
                    $scope.filter.role = $scope.filterRoles[findObjIndex($scope.filterRoles,cacheParams.role)];

                    paginate($scope.allItems);

                    //撤销对缓存数据的引用，这句很重要
                    cacheParams = {};
                });
            }
        });

        $scope.changeFilterRole = function(){
            $scope.filterParmas.role = $scope.filter.role.value;
        };

        //edit user
        $scope.edit = function(item){
            $state.go('auth.useredit',{"userid":item.id});
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
                        listDS.disable(item);
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });

        };

        //del user
        $scope.del = function(item,index){
            $modal.open({
                template: confirmDialogTpl,
                scope:$scope,
                controller: ['$scope', '$modalInstance',function($scope,$modalInstance){
                    $scope.title = 'Confirm';
                    $scope.content ='Are you sure to delete this user ?';
                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.confirm = function(){
                        listDS.delete({"uids":item.id}).then(function(data){
                            $scope.items.splice(index,1);
                        },function(error){
                            listDS.logger.error(error.msg || 'delete faild.');
                        });
                        $modalInstance.dismiss('cancel');
                    };
                }]
            })
        };
        //create user
        $scope.createUser = function(){
            $state.go('auth.createuser');
        };

        //view user
        $scope.viewDetail = function(item){
            $state.go('auth.userpermission',{"userid":item.id});
        };

    }
});