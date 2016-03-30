/**
 * Created by jhzhang on 2014/10/9.
 */
define(['common/utils/dataConverter'],function(dataConverter){
    var diName = 'RoleManagementCtrl';
    return {
        __register__:function(mod){
            mod.controller(diName,['$scope','$filter', '$state', 'ngTableParams', 'ds.userlist', 'PER_PAGE', RoleManagementCtrl]);
            return mod;
        }
    };

    function RoleManagementCtrl($scope, $filter , $state,  ngTableParams, listDS,  PER_PAGE){

    }
});