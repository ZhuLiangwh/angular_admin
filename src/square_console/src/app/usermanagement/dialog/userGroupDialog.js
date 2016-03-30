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
            $scope.groups.forEach(function(item){
                item.selected && (selected.push(item));
            });
            listDS.selectedGroups = selected;
            $modalInstance.dismiss('cancel');
        }

        $scope.groups = listDS.groups;
    }
});
