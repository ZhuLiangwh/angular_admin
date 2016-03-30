define(['common/utils/date'], function (dateUtil) {
    var diName = 'AdpushEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService','$q', '$state', '$window', '$location', 'ds.adpush', '$log', 'dpDialog',AdpushEditCtrl]);
            return mod;
        }
    };

    function AdpushEditCtrl($rootScope, $scope,apiService,$q, $state, $window, $location, DS, $log, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        $scope.displayInfo = null;

        $scope.budtype =  [
            {number: 1, name: "总预算"},
            {number: 2, name: "每日预算"}
        ];

        $scope.datePicker = {
            start: {
                dt: dateUtil.getRelativeDate(0, new Date())
            },
            end: {
                dt: dateUtil.getRelativeDate(0, new Date())
            }
        };

        $scope.entity.budgettype = $scope.budtype[0].number;

        $scope.entity.adgroup = [];
        $scope['isCollapse1'] = false;
        $scope['isCollapse2'] = false;
        $scope['isCollapse3'] = false;

        checkDisplayData();

        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;
                //点击选择时间设置一个状态
                $scope.entity.adgroup.forEach(function(item){
                    item['startopened'] = false;
                    item['endopened'] = false;
                })
            });
        }else{
            $scope.datePicker.start.dt = 0;
            $scope.datePicker.end.dt =  0;

            $scope.entity.budget = {type:'',value:''};
        }

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };

        //检查唯一性
        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/adpush/check_unique');
        }
        $scope.methods = function(){
            return getMethod = isEditState ? 'update' : 'add';
        }
        $scope.ids = function(){
            return getId = stateParams.id;
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
            action = 'add';
            saveEntity();
        };

        $scope.removeFiled = function (modelName) {
            $scope.entity[modelName]='';
        };

        $scope.delGroup = function ($index) {
            $scope.entity.adgroup.splice('$index',1);
        }

        //datapicker
        $scope.openData = function($event, datePickerInput, type) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerInput[type] = true;
        };



        $scope.format = 'yyyy-MM-dd HH:mm:ss';

        $scope.$watch('entity.adgroup',function(adgroup){
            adgroup.map(function(item){
                item['effectivetime'] && (item.effectivetime = new Date(item['effectivetime'])-0);
                item['expiretime'] && (item.expiretime = new Date(item['expiretime'])-0);
            })
        },true);


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
                from:'turbotservice_adpush'
            });
        };

        $scope.popUp2 = function(method, moduleName, modelName,label,index,params,single){
            $scope.popUp(method, moduleName, modelName,label,index,params,single);
            curRefItem = 'rule_id';
        }

        $scope.popUp3 = function(method, moduleName, modelName,label,index,params,single){
            $scope.popUp(method, moduleName, modelName,label,index,params,single);
            curRefItem = 'adpos';
        }

        $scope.popUp4 = function(method, moduleName, modelName,label,index,params,single){
            $scope.popUp(method, moduleName, modelName,label,index,params,single);
            curRefItem = 'adsource';
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

                var a = [];
                a = $scope.entity.adgroup[curRefIndex] || ($scope.entity.adgroup[curRefIndex] = {})
                a[curRefItem] = item;

            }else{
                $scope.entity[curRefItem] = item;
            }
            $scope.$apply();
        };

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

        function checkDisplayData() {
            var deferred = $q.defer();
            if($scope.displayInfo) {
                deferred.resolve($scope.displayInfo);
            } else {
                DS.protodata()
                    .then(function(data) {
                        var data = data.data.data;
                        $scope.usertags = data.usertag;

                        deferred.resolve($scope.displayInfo);
                    }, function(error) {
                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        }


    }
});
