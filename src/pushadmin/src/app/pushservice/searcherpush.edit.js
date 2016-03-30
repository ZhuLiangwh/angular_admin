define([], function () {
    var diName = 'SearcherpushEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$state','$modal', '$window', '$location', 'ds.searcherpush', '$log', 'dpDialog',SearcherpushEditCtrl]);
            return mod;
        }
    };

    function SearcherpushEditCtrl($rootScope, $scope,apiService, $state,$modal, $window, $location, DS, $log, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        //select acitce
        $scope.action_type = [
            {value:'add',name:'Add'},
            {value:'modify',name:'Modify'},
            {value:'delete',name:'Delete'}
        ];

        $scope.entity.method = $scope.action_type[0].value;

        $scope.push_typies = [
            {value:'searcher',display_value:'searcher'}
        ];

        $scope.removeFiled = function (modelName) {
            $scope[$scope.entity.method][modelName]='';
        };

        //提交时对应三种不同的数据
        $scope.add = {method:'add', id: stateParams.id,is_default: false,is_force: false, push_type:$scope.push_typies[0].value};
        $scope.modify = {method:'modify', id: stateParams.id,is_default: false,is_force: false,push_type:$scope.push_typies[0].value};
        $scope.delete = {method:'delete', id: stateParams.id,is_default: false,is_force: false,push_type:$scope.push_typies[0].value};

        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;

                //编辑时对应三种不同类型的数据
                if($scope.entity.method ==='add')
                {
                    $scope.add = DS.data;
                    $scope.add.push_type = $scope.push_typies[0].value;
                }
                if($scope.entity.method ==='modify')
                {
                    $scope.modify = DS.data;
                    $scope.modify.push_type = $scope.push_typies[0].value;
                }
                if($scope.entity.method ==='delete')
                {
                    $scope.delete = DS.data;
                    $scope.delete.push_type = $scope.push_typies[0].value;
                }
            });
        }

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };

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
            action = 'add';
            saveEntity();
        };

        $scope.afterVali = function() {
            if(!$scope[$scope.entity.method].aosruledata){
                alert('推送规则不能为空');
                return false;
            }
        }

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
                from:'pushservice_searcher'
            });
        };

        //添加引用时对应三种不同的类型
        $window.onmessage = function(e){
            var data = e.data,
                item = data.item,
                single = data.single;

            if(single === 'false'){
                $scope[$scope.entity.method][curRefItem] = $scope[$scope.entity.method][curRefItem] || ($scope[$scope.entity.method][curRefItem] = []);
                if(item.id in _.indexBy($scope[$scope.entity.method][curRefItem],'id')){
                    for(var i= 0,len=$scope[$scope.entity.method][curRefItem].length; i<len;i++){
                        if($scope[$scope.entity.method][curRefItem][i]['id'] == item.id){
                            curRefIndex = i;
                            break;
                        }
                    }
                }
                $scope[$scope.entity.method][curRefItem][curRefIndex] = item;
            }else{
                $scope[$scope.entity.method][curRefItem] = item;

            }
            $scope.$apply();
        };

        $scope.popUp_details = function(method, moduleName, modelName,label,index,params,single){
            $scope.popUp(method, moduleName, modelName,label,index,params,single);
            curRefItem = 'searcher_modify';
        };

        function saveEntity(callback) {
           delete $scope[$scope.entity.method].push_type;
            return DS[action]($scope[$scope.entity.method])
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
