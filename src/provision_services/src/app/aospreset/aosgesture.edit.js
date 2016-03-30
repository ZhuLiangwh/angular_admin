define([], function () {
    var diName = 'AosgestureEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope','apiService', '$scope', '$state', '$window', '$location', 'ds.aosgesture', '$log','dpDialog', AosgestureEditCtrl]);
            return mod;
        }
    };

    function AosgestureEditCtrl($rootScope,apiService, $scope, $state, $window, $location, DS, $log,dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            action;

        $scope.entity = {};

        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/aosgesture/check_unique');
        }

        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;
            });
        }

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };

        //保存为新的时，原始值赋为空
        function addCheckunique(){
            return DS['addCheckunique']({original_value:'', title:$scope.entity.title})
                .then(function(data){
                    if(data.data.data.unique === true){
                        action = 'add';
                        saveEntity();
                    }else{
                        DS.logger.error('Title should be unique');
                    }
                },function(error){

                })
        }

        //init the collapse component
        $scope['isCollapse1'] = false;

        $scope.save = function () {
            action = isEditState ? 'update' : 'add';
            saveEntity(function(){
                !$scope.isPopup() && $window.history.back();
            });
        };

        $scope.saveAndContinueEdit = function () {
            action = 'add';
            saveEntity();
        };

        $scope.saveAsNew = function () {
            addCheckunique();
        };


        function saveEntity(callback) {
            var fd = new FormData(), key;

            //将参数转换成formdata,这样才能传送文件
            for (key in $scope.entity) {
                $scope.entity[key] && fd.append(key, $scope.entity[key]);
            }

            return DS[action](fd).then(function (data) {
                DS.logger.success('save success.');
                callback && callback();
                handlerPopSave(data.data.data);
            }, function (error) {
                DS.logger.error(error.data.msg || '');
                //save failed
            });
        }


        function clearForm() {
            $scope.entity = {};
        }

        function handlerPopSave(item) {
            if ($location.search().popup) {
                var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'];
                ifr_window.postMessage({item:item,single:$location.search().single},'*');
                dpDialog.close();
            }
        }


        $scope.getFileInfo = function (node) {
            //文件选择框可能点击的是取消
            if (node.fileInfo) {
                var modelName = node.modelName.split('.');
                modelName = modelName[1] || modelName[0];
                $scope.entity[modelName] = node.fileInfo;
                $scope.iconChanged = true;
                $scope.$apply();//强制检查界面变化
            }
        };

    }
});
