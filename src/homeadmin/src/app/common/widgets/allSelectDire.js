define(function () {
    var diName = 'allSelectDire';
    return {
        __register__: function (mod) {
            mod.directive(diName, ['$timeout',function($timeout){
                return {
                    restrict: 'A',
                    scope:{
                        'hasSelected':'=',
                        'allSelectResource':'=',
                        'onchanged':'&'
                    },
                    link:function($scope, $element, $attrs){
                        var $checkboxes,len;
                        var getElement = function(){
                            $checkboxes = angular.element(':checkbox[name='+$attrs[diName]+']');
                            len = $checkboxes.length;
                        };
                        var getSelected = function(){
                            var selected = [];
                            $checkboxes.each(function(i,item){
                                item.checked && (selected.push(item.value));
                            });

                            $scope.hasSelected = selected;
                            $scope.$apply();

                            $scope.onchanged({selected:selected});
                            return selected;
                        };

                        var setSelectStatus = function(selected){
                            selected = selected || [];
                            $element.prop('checked',selected.length === len && len !== 0);
                            $element.prop('indeterminate',selected.length !== len && selected.length !== 0);
                        };

                        var setSelected = function(){
                            if(!$checkboxes) return;
                            //如果不用$timeout，会得不到item.value
                            $timeout(function(){
                                $checkboxes.each(function(i,item){
                                    $scope.hasSelected && $scope.hasSelected.indexOf(item.value-0) > -1 && (item.checked = true);
                                });
                                setSelectStatus($scope.hasSelected);
                            },0);
                        };

                        $scope.hasSelected = $scope.hasSelected || [];
                        $scope.$watch('hasSelected',setSelected);

                        $scope.$watchCollection('allSelectResource',function(newData){
                            if(newData && (newData.length || !_.isEmpty(newData))){
                                getElement();
                                setSelected();
                                $checkboxes.off().on('change',function(){
                                    setSelectStatus(getSelected());
                                });
                            }
                        });

                        $element.on('change',function(){
                            if(!$checkboxes) return;
                            $checkboxes.prop('checked',this.checked);
                            getSelected();
                        });
                    }
                }
            }]);
            return mod;
        }
    };
});