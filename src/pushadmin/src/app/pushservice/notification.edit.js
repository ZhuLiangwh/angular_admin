define(['common/utils/date'], function (dateUtil) {
    var diName = 'NotificationEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$state','$modal', '$window', '$location', 'ds.notification', '$log', 'dpDialog',NotificationEditCtrl]);
            return mod;
        }
    };

    function NotificationEditCtrl($rootScope, $scope,apiService, $state,$modal, $window, $location, DS, $log, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;
                $scope.datePicker.start.dt = $scope.entity.start_time ? new Date($scope.entity.start_time): new Date();
            });
        }

        //检查唯一性
        //$scope.getCheckSortUrl = function() {
        //    return apiService.getApiUrl('/notification/check_unique');
        //}
        $scope.methods = function(){
            return getMethod = isEditState ? 'update' : 'add';
        }
        $scope.ids = function(){
            return getId = stateParams.id;
        }


        //datePicker
        $scope.openData = function($event, datePickerInput) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerInput.opened = true;
        };

        $scope.datePicker = {
            start: {
                dt: dateUtil.getRelativeDate(0, new Date())
            }
        };


        //$scope.formats = ['yyyy-MM-dd HH:mm:ss'];
        $scope.format = 'yyyy-MM-dd HH:mm:ss';

        $scope.entity.is_update = true;

        $scope.$watch('datePicker.start.dt',function(newTime){
            $scope.entity.start_time = newTime-0;
        });

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };

        $scope.afterVali = function() {
            if(!$scope.entity.aosruledata){
                alert('推送规则不能为空');
                return false;
            }
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
                from:'pushservice_notification'
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

        function saveEntity(callback) {
            console.log($scope.entity)
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
