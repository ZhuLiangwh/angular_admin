define(function () {
    var diName = 'allSelectDire2';
    return {
        __register__: function (mod) {
            mod.directive(diName, [function(){
                return {
                    restrict: 'A',
                    scope:{
                        'hasSelected':'=',
                        'allSelectResource':'=',
                        'onchanged':'&'
                    },
                    link:function($scope, $element, $attrs){
                        var init = true;

                        $scope.$watch('allSelectResource',function(newData){
                            if(!newData) return;
                            var re = [],len = newData.length;
                            if(init){
                                newData.forEach(function(item){
                                    if($scope.hasSelected.indexOf(item.id) > -1) item.checked = true;
                                });
                                init = false;
                            }
                            newData.forEach(function(item){
                                item.checked && re.push(item.id);
                            });
                            $scope.hasSelected = re;
                            $scope.onchanged($scope.hasSelected);

                            $element.prop('indeterminate',re.length < len && re.length > 0);
                            $element.prop('checked',re.length === len);
                        },true);

                        $element.on('change',function(){
                            var checked = this.checked,re = [];
                            $scope.allSelectResource.forEach(function(item){
                                item.checked = checked;
                                checked && re.push(item.id);
                            });
                            $scope.hasSelected = re;
                            $scope.onchanged($scope.hasSelected);
                            $scope.$apply();
                        });
                    }
                }
            }]);
            return mod;
        }
    };
});