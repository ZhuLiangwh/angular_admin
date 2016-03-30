define([], function() {
    var diName = 'ThemeEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope', 'apiService', '$state', '$window', '$location', 'ds.theme', '$log','dpDialog', ThemeEditCtrl]);
            return mod;
        }
    };

    function ThemeEditCtrl($rootScope, $scope, apiService, $state, $window, $location, DS, $log, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};


        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;
                $scope.entity.recommend = $scope.entity.recommend? '1':'0';
            });
        }

        //检查唯一性
        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/theme/check_unique');
        }
        $scope.methods = function(){
            return getMethod = isEditState ? 'update' : 'add';
        }
        $scope.ids = function(){
            return getId = stateParams.id;
        }
	    $scope.isPopup = function () {
            return !!$location.search().popup;
        };
        //保存为新的时，原始值赋为空
        function addCheckunique(){
            action = 'add';
            return DS['addCheckunique']({title: $scope.entity.title, method:action})
                .then(function(data){
                    if(data.data.data.unique === true){
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

        $scope.saveAsNew = function() {
            addCheckunique();
            if( !$scope.entity.dwpfile_file || $scope.entity.dwpfile_file.length === 0){
                alert('请选择新的文件上传');
                return false;
            }
        };

        $scope.open = function ($event, columnName) { //for datepicker
            $event.preventDefault();
            $event.stopPropagation();
            $scope[columnName] = true;
        };

        $scope.removeFiled = function (modelName) {
            $scope.entity[modelName]='';
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
                from:'themestore_theme'
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


        $scope.popUp_logo = function(method, moduleName, modelName,label,index,params,single){
            $scope.popUp(method, moduleName, modelName,label,index,params,single);
            curRefItem = 'logo';
        };
        $scope.popUp_themecategory = function(method, moduleName, modelName,label,index,params,single){
            $scope.popUp(method, moduleName, modelName,label,index,params,single);
            curRefItem = 'themecategory';
        };

        $scope.afterVali = function(){
            if( !$scope.entity.icon || $scope.entity.icon.length === 0){
                alert('图标不能为空');
                return false;
            }
            if( !$scope.entity.logo || $scope.entity.logo.length === 0){
                alert('Icon detail不能为空');
                return false;
            }
            if( !$scope.entity.themecategory || $scope.entity.themecategory.length === 0){
                alert('分类不能为空');
                return false;
            }
            if( !$scope.entity.aosruledata || $scope.entity.aosruledata.length === 0){
                alert('推送规则不能为空');
                return false;
            }
        }

        $scope.values = [
            {name: '未知', val: 1},
            {name: '新的', val: 2},
            {name: '热门', val: 3}
        ];

        $scope.entity.theme_tag = 1;

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

        $scope.entity.recommend = '1';

        function saveEntity(callback) {
            var fd = new FormData(), key;
            //将参数转换成formdata,这样才能传送文件
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
                    DS.logger.error(error.data.msg || 'save failed.');
                    //save failed
                });
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
