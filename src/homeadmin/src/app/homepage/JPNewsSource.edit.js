define([], function () {
    var diName = 'JPNewsSourceEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$state','$modal', '$window', '$location', 'ds.JPNewsSource', '$log', 'dpDialog',JPNewsSourceEditCtrl]);
            return mod;
        }
    };
    function JPNewsSourceEditCtrl($rootScope, $scope,apiService, $state,$modal, $window, $location, DS, $log, dpDialog) {
        var apiParams = $scope.apiParams = {};
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        if (isEditState) {
            DS.edit({
                id:stateParams.id
            }).then(function(data){
                $scope.entity= DS.data;
            });
        }else{
            $scope.entity.spider_num = 0;
        }

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };
        $scope.save = function () {
            action = isEditState ? 'update' : 'add';
            saveEntity(function(){
                !$scope.isPopup() && $window.history.back();
            });
        };
        $scope.removeFiled = function (modelName) {
            $scope.entity[modelName]='';
            $scope.entity.cate_id=0;
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
                from:'homepage_JPNewsCate'
            });
        };
        var o = {
            'JPNewsCate':'cate_id'
        }
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
                if(o[curRefItem]){
                    $scope.entity[o[curRefItem]] = $scope.entity[o[curRefItem]] || ($scope.entity[o[curRefItem]]=[]);
                    $scope.entity[o[curRefItem]][curRefIndex] = item.id;
                }
            }else{
                $scope.entity[curRefItem] = item;
                o[curRefItem] && ($scope.entity[o[curRefItem]] = item.id);
            }
            $scope.$apply();
        }

        $scope.afterVali = function(){
            if( !$scope.entity.JPNewsCate || $scope.entity.JPNewsCate.length === 0){
                alert('默认分类不能为空');
                return false;
            }
        }
        function saveEntity(callback) {
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