define([], function () {
    var diName = 'PictureSubjectEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$state','$modal', '$window', '$location', 'ds.pictureSubject', '$log', 'dpDialog',PictureSubjectEditCtrl]);
            return mod;
        }
    };

    function PictureSubjectEditCtrl($rootScope, $scope,apiService, $state,$modal, $window, $location, DS, $log, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;
                $scope.entity.rule_id = $scope.entity.aosruledata.id;
            });
        }else{
            $scope.entity.description = " ";
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

        $scope.saveAsNew = function () {
            action = 'add';
            saveEntity(function(){
                !$scope.isPopup() && $window.history.back();
            });
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
                from:'homepage_pictureSubject'
            });
        };

        var o = {
            'aosruledata':'rule_id'
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
        };

        $scope.afterVali = function(){
            if( !$scope.entity.aosruledata || $scope.entity.aosruledata.length === 0){
                alert('推送规则不能为空');
                return false;
            }
            if(!valiOrder([$scope.entity.picture])){
                alert('order不能为空');
                return false;
            }
        }

        //order验证
        function valiOrder(data){
            var re = data.length,
                val = function(arr){
                    var re = 0;
                    if(typeof arr === 'undefined') return re;
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
});
