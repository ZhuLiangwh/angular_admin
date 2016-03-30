define([], function() {
    var diName = 'ThemepushEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope', 'apiService', '$state', '$window', '$location', 'ds.themepush', '$log','dpDialog', ThemepushEditCtrl]);
            return mod;
        }
    };

    function ThemepushEditCtrl($rootScope, $scope, apiService, $state, $window, $location, DS, $log, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        $scope.isfree = [
            {value:true,name:'免费'},
            {value:false,name:'付费'},
        ];

        // size select
        $scope.size = [
            {value:'iphone2x',name:'iphone2x'},
            {value:'iphone3x',name:'iphone3x'},
            {value:'ipad2x',name:'ipad2x'},
            {value:'ipad3x',name:'ipad3x'}
        ];

        //检查唯一性
        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/themepush/check_unique');
        }
        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;
            });
        }else{
            $scope.entity.size = $scope.size[0].value;
            $scope.entity.isfree = $scope.isfree[0].value;
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

	    $scope.isPopup = function () {
            return !!$location.search().popup;
        };
        //保存为新的时，原始值赋为空
        function addCheckunique(){
            action = 'add';
            return DS['addCheckunique']({title: $scope.entity.title, method:action, id: $scope.entity.id})
                .then(function(data){
                    if(data.data.data.unique === true){
                        saveEntity(function(){
                            !$scope.isPopup() && $window.history.back();
                        });
                    }else{
                        DS.logger.error('Title should be unique');
                    }
                },function(error){

                })
        }

        $scope.save = function () {
            action = isEditState ? 'update' : 'add';
            saveEntity(function(){
                !$scope.isPopup() && $window.history.back();
            });
        };

        $scope.saveAsNew = function() {
            addCheckunique();
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
                from:'themepushstore_themepush'
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

        $scope.afterVali = function(){
            if( !$scope.entity.aosruledata || $scope.entity.aosruledata.length === 0){
                alert('推送规则不能为空');
                return false;
            }
            if(!valiOrder([$scope.entity.themefolder,$scope.entity.theme])){
                alert('order不能为空');
                return false;
            }
        }

        //order验证
        function valiOrder(data){
            var re = data.length,
                val = function(arr){
                    var re = 0;
                    if(typeof arr === 'undefined' || arr === null) return re;
                    arr.forEach(function(item){
                        typeof item.order === 'undefined' &&　(re = -1);
                    });
                    return re;
                };
            data.forEach(function(item){
                re += val(item);
            });
            return re === data.length;
        }

        function saveEntity(callback) {
            for (var key in $scope.entity) {
                var item = $scope.entity[key];
                if (_.isArray(item) && item.length > 0 && _.isObject(item[0])) {
                    $scope.entity[key] = _.filter(item, function (filterItem) {
                        return !filterItem.isDelete;
                    });
                }
            }

            return DS[action]($scope.entity)
                .then(function (data) {
                    DS.logger.success('save success.');
                    callback && callback();
                    handlerPopSave(data.data.data);
                }, function (error) {
                    DS.logger.error(error.data.msg ||'save fail.');
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
