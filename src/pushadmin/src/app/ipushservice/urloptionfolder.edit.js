define([], function () {
    var diName = 'UrloptionfolderEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope', 'apiService','$state', '$window', '$location', 'ds.iurloptionfolder', '$log','dpDialog', UrloptionfolderEditCtrl]);
            return mod;
        }
    };

    function UrloptionfolderEditCtrl($rootScope, $scope,apiService, $state, $window, $location, DS, $log,dpDialog) {
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

        //检查唯一性
        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/iurloptionfolder/check_unique');
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
            return DS['addCheckunique']({title: $scope.entity.title, method:action, id: $scope.entity.id})
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
            return DS['addCheckunique']({title: $scope.entity.title, method: action, id: $scope.entity.id})
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
                from:'ipushservice_iurloptionfolder'
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

        $scope.deleteRow = function (refItem) {
            for (var key in $scope.entity) {
                var item = $scope.entity[key];
                if (_.isArray(item) && item.length > 0 && _.isObject(item[0])) {
                    item.splice(item.indexOf(refItem), 1);
                }
            }
        };

        $scope.afterVali = function () {
            if (!$scope.entity.iurloption || $scope.entity.iurloption.length === 0) {
                alert('网址不能为空');
                return false;
            }
        }


        function saveEntity(callback) {
            return DS[action]($scope.entity).then(function (data) {
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
