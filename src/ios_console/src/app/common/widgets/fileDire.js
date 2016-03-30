/**
 * Created by jhzhang on 2014/10/30.
 */
define([],function(){
    var diName = "fileSimulation";
    return {
        __register__: function(mod) {
            mod.directive(diName, ['logger',fileSimulation]);
            return mod;
        }
    };

    function fileSimulation(logger){
        return {
            restrict: 'A',
            scope: {
                change: '&',
                checkFile:'&',
                toBeDisabled:'=',
                fileError:'='
            },
            replace:true,
            template:'<div class="file-simulation" ng-class="{\'file-simulation-disabled\':toBeDisabled}"><input type="file" class="form-control"><button type="button"><i class="fa fa-upload"></i>{{btnText}}</button></div>',
            link:function($scope,$element,$attrs){
                //支持多种格式用|分隔即可
                var fileTypeReg = new RegExp('\\.('+$attrs['fileSimulation'].toLowerCase().replace(/\s+/g,'')+')$');
                $scope.btnText = 'Browser...';
                $element.on('change',function(){
                    var fileInput = $element.find('input[type="file"]')[0],
                        file = fileInput.files[0];

                    /*if(fileInput.value === ''){
                        $scope.btnText = 'Browser...';
                        return;
                    };*/

                    /*if(!fileTypeReg.test(file.name)){
                        $scope.errorhandler({file:file,fileName:file.name});
                        logger.error('Upload file`s format is wrong！');
                        fileInput.value = '';
                        file = fileInput.files[0];
                        return false;
                    }*/

                    if($scope.checkFile({file:file,fileName:file.name}) === false){
                        fileInput.value = '';
                        file = fileInput.files[0];
                        return false;
                    }

                    $scope.btnText = 'Upload again...';
                    $scope.$apply();
                    $scope.change({file:file})

                });

                $scope.$watch('fileError',function(newValue){
                    $element.find('input[type="file"]')[0].value = '';
                    $scope.btnText = 'Browser...';
                })
            }
        }
    }
});