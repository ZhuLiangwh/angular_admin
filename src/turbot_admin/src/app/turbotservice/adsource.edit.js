define([], function () {
    var diName = 'AdsourceEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$q' , '$state', '$window', '$location', 'ds.adsource', '$log','logger', 'dpDialog',AdsourceEditCtrl]);
            return mod;
        }
    };

    function AdsourceEditCtrl($rootScope, $scope, apiService, $q, $state, $window, $location, DS, $log, logger,dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

            $scope.displayInfo = null;

        checkDisplayData().then(function() {
            if(isEditState) {
                DS.edit({
                    'id': stateParams.id
                })
                    .then(function(data) {
                        $scope.entity = DS.data;
                    })
            }
        });
        $scope.entity = {};

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
        
        //检查唯一性
        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/adsource/check_unique');
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
                from:'turbot_adsource'
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

        function checkDisplayData() {
            var deferred = $q.defer();
            if($scope.displayInfo) {
                deferred.resolve($scope.displayInfo);
            } else {
                DS.protodata()
                    .then(function(data) {
                        $scope.displayInfo = data.data.data;
                        //$scope.displayInfo.platform= _.indexBy($scope.displayInfo.platform, 'value');
                        $scope.entity.accounttype = $scope.displayInfo.accounttype[0].number;
                        $scope.entity.source = $scope.displayInfo.source[0].number;
                        $scope.entity.type = $scope.displayInfo.type[0].number;

                        deferred.resolve($scope.displayInfo);
                    }, function(error) {
                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        }
    }
});
