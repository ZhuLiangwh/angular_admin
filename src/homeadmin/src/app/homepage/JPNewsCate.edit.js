define([], function () {
    var diName = 'JPNewsCateEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$state','$q','$modal', '$window', '$location', 'ds.JPNewsCate', '$log', 'dpDialog',JPNewsCateEditCtrl]);
            return mod;
        }
    };
    function JPNewsCateEditCtrl($rootScope, $scope,apiService, $state, $q, $modal, $window, $location, DS, $log, dpDialog) {
        var apiParams = $scope.apiParams = {};
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        function getDisplayData(){
            var dfer = $q.defer()
            DS.getDisplayData().then(function(data){
                var data = data.data.data;
                $scope.locales = data.locale;
                dfer.resolve(data)
            },function(error){
                dfer.reject(error);
            });
            return dfer.promise;
        }

        getDisplayData().then(function() {
            if($scope.isEditState) {
                DS.edit({
                    'id': stateParams.id
                })
                .then(function(data) {
                    $scope.entity = DS.data;
                })

            }
        })

        $scope.isPopup = function () {
            return !!$location.search().popup;
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
                from:'homepage_aosruledata'
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

        $scope.save = function () {
            action = isEditState ? 'update' : 'add';
            saveEntity(function(){
                !$scope.isPopup() && $window.history.back();
            });
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


    }
});