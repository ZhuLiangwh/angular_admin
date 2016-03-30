define([], function () {
    var diName = 'RateusoptimizationEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService', '$state', '$window', '$location', 'ds.rateusoptimization','dpDialog', '$log',RateusoptimizationEditCtrl]);
            return mod;
        }
    };

    function RateusoptimizationEditCtrl($rootScope, $scope,apiService, $state, $window, $location, DS, dpDialog, $log) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'), action;

        $scope.entity = {};

        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;
            });
        }else{
            $scope.entity.type_proportion_list = [];
        }

        //检查唯一性
        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/rateusoptimization/check_unique');
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

        //init the collapse component
        $scope['isCollapse1'] = false;


        $scope.afterVali = function() {
            if(!$scope.entity.aosruledata){
                alert('推送规则不能为空');
                return false;
            }
        }

        $scope.addRow = function(){
            $scope.entity.type_proportion_list.push({"weight":''});
        };

        $scope.delRow = function($index){
            $scope.entity.type_proportion_list.splice($index, 1);
        };

        function savedata(){
            var data = [];
            $scope.entity.type_proportion_list.forEach(function(item){
                item.weight && (data.push(item.weight));
            });
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
                from:'revenueservice_addondownloadurl'
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
            savedata();
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

        function handlerPopSave(item) {
            if ($location.search().popup) {
                var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'];
                ifr_window.postMessage({item:item,single:$location.search().single},'*');
                dpDialog.close();
            }
        }

    }
});
