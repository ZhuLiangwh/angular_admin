define([], function () {
    var diName = 'AossearcherEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$state', '$window', '$location', 'ds.aossearcher', '$log','dpDialog', AossearcherEditCtrl]);
            return mod;
        }
    };

    function AossearcherEditCtrl($rootScope, $scope,apiService, $state, $window, $location, DS, $log,dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        $scope.removeFiled = function (modelName) {
          $scope.entity[modelName]='';
        };

        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/aossearcher/check_unique');
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
        $scope['isCollapse2'] = false;

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
                from:'aospreset_aossearcher'
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

        function saveEntity(callback) {
            //pre process the post item: remove the inline reference item to be deleted
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
})
