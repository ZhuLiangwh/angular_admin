define([], function () {
    var diName = 'WebappsubjectEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$state', '$window', '$location', 'ds.webappsubject', '$log','dpDialog', WebappsubjectEditCtrl]);
            return mod;
        }
    };

    function WebappsubjectEditCtrl($rootScope, $scope,apiService, $state, $window, $location, DS, $log,dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;
            });
        }

        $scope.deleteRow = function(refItem){
            for (var key in $scope.entity) {
                var item = $scope.entity[key];
                if (_.isArray(item) && item.length > 0 && _.isObject(item[0])) {
                    $scope.entity[key].splice($scope.entity[key].indexOf(refItem),1)
                }
            }
        }

        //检查唯一性
        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/webappsubject/check_unique');
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
        $scope['isCollapse2'] = false;


        $scope.save = function () {
            action = isEditState ? 'update' : 'add';
            var dict ={title: $scope.entity.title, method: action};
            if (action === "update"){
                dict.id = $scope.entity.id;
            }

            return DS['addCheckunique'](dict)
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
        };

        $scope.saveAndContinueEdit = function () {
            action = 'add';
            saveEntity();
        };

        $scope.saveAsNew = function () {
            addCheckunique();
        };

        $scope.removeFiled = function (modelName) {
            $scope.entity[modelName] = '';
        };


        $scope.open = function ($event, columnName) { //for datepicker
            $event.preventDefault();
            $event.stopPropagation();
            $scope[columnName] = true;
        };
        $scope.format = 'yyyy-MM-dd';

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
                from:'webapps_webappsubject'
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
                item.order = 1;
            }else{
                $scope.entity[curRefItem] = item;
            }
            $scope.$apply();
        };

        $scope.afterVali = function(){
            if( !$scope.entity.icon || $scope.entity.icon.length === 0){
                alert('专题图标不能为空');
                return false;
            }
            if( !$scope.entity.aosruledata || $scope.entity.aosruledata.length === 0){
                alert('推送规则不能为空');
                return false;
            }
            if( !$scope.entity.webapp || $scope.entity.webapp.length === 0){
                alert('专题关联应用不能为空');
                return false;
            }
        }

        $scope.values = [
            {name: '未知', val: 1},
            {name: '新的', val: 2},
            {name: '热门', val: 3}
        ];

        $scope.entity.subject_tag = 1;

        function saveEntity(callback) {
            return DS[action]($scope.entity)
                .then(function (data) {
                    DS.logger.success('save success.');
                    callback && callback();
                    handlerPopSave(data.data.data);
                }, function (error) {
                    DS.logger.error(error.data.msg || 'save fail.');
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
