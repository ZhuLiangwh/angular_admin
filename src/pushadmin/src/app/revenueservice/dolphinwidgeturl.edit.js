define([], function () {
    var diName = 'DolphinwidgeturlEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$state', '$window', '$location', 'ds.dolphinwidgeturl', '$log', 'dpDialog',DolphinwidgeturlEditCtrl]);
            return mod;
        }
    };

    function DolphinwidgeturlEditCtrl($rootScope, $scope,apiService, $state, $window, $location, DS, $log, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        //检查唯一性
        // $scope.getCheckSortUrl = function() {
        //     return apiService.getApiUrl('/dolphinwidgeturl/check_unique');
        // }
        // $scope.methods = function(){
        //     return getMethod = isEditState ? 'update' : 'add';
        // }
        // $scope.ids = function(){
        //     return getId = stateParams.id;
        // }

        $scope.tags = [
            {value:'白名单',name: true},
            {value:'黑名单',name: false}
        ];
        $scope.entity.tag = $scope.tags[0].name;
        


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


        $scope.afterVali = function() {
            // if(!$scope.entity.aosruledata){
            //     alert('推送规则不能为空');
            //     return false;
            // }
        }


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
            if( !$scope.entity.dwpfile_file || $scope.entity.dwpfile_file.length === 0){
                alert('请选择新的文件上传');
                return false;
            }
            action = 'add';
            saveEntity();
        };



        $scope.removeFiled = function (modelName) {
            $scope.entity[modelName]='';
        };

        $scope.open = function ($event, columnName) { //for datepicker
            $event.preventDefault();
            $event.stopPropagation();
            $scope[columnName] = true;
        };

        $scope.popUp = function(method, moduleName, modelName,label,index,params,single){
            var path = '/' + moduleName + '/' + modelName,
                query = '?popup=1&label='+ (label || 'title') +'&single='+(!!single),
                originUrl = $location.absUrl(),
                originPath = $location.url();

            curRefItem = modelName;
            curRefIndex = index || 0;

            switch (method){
                case 'list' :
                    path += query;
                    break ;
                case 'add' :
                    path += '/add' + query;
                    break ;
                case 'edit' :
                    path += '/'+params +query;
                    break ;
            }

            dpDialog.loadIframe({
                title:'引用资源',
                content:originUrl.replace(originPath, path),
                from:'revenueservice_dolphinwidgeturl'
            });
        };

        $window.onmessage = function(e){
            var data = e.data,
                item = data.item,
                single = data.single;
            if(single === 'false'){
                $scope.entity[curRefItem] = $scope.entity[curRefItem] || ($scope.entity[curRefItem] = []);
                if(item.id in _.indexBy($scope.entity[curRefItem],'id')){
                    for(var i= 0,len=$scope.entity[curRefItem].length; i<len;i++){
                        if($scope.entity[curRefItem][i]['id'] == item.id){
                            curRefIndex = i;
                            break;
                        }
                    }
                }
                $scope.entity[curRefItem][curRefIndex] = item;
            }else{
                $scope.entity[curRefItem] = item;
            }
            $scope.$apply();
        };

        $scope.getFileInfo = function (node) {
            // console.log(node);
            // console.log(node.fileInfo.name)
            // var houzui = node.fileInfo.name.split('.');
            // if (houzui[1] != 'txt') {
            //     alert('文件必须是txt文件')
            // };
            //文件选择框可能点击的是取消
            if (node.fileInfo) {
                var modelName = node.modelName.split('.');
                // console.log(modelName);
                modelName = modelName[1] || modelName[0];
                // console.log(modelName)
                $scope.entity[modelName] = node.fileInfo;
                // console.log($scope.entity[modelName])
                // $scope.iconChanged = true;
                $scope.$apply();//强制检查界面变化
            }
        };

        function saveEntity(callback) {

            var fd = new FormData(), key;

            // //将参数转换成formdata,这样才能传送文件
            for (key in $scope.entity) {
                var val = $scope.entity[key];
                fd.append(key, _.isObject(val) && !val.size ? val.id : val);
            }

            return DS[action](fd)
                .then(function (data) {
                    DS.logger.success('save success.');
                    callback && callback();
                    handlerPopSave(data.data.data);
                }, function (error) {
                    DS.logger.error(error.data.msg ||'save fail.');
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
    }
});
