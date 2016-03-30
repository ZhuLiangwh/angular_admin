/**
 * Created by jhzhang on 2014/10/10.
 */
define([],function(){
    return function($scope, $modalInstance, logger, listDS){

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.confirmSelect = function(){
            var selected = [];
            $scope.roles.forEach(function(item){
                item.selected && (selected.push(item));
            });
            listDS.selectedRoles = selected;
            $modalInstance.dismiss('cancel');
        }

        $scope.roles = listDS.roles;
    }
});
