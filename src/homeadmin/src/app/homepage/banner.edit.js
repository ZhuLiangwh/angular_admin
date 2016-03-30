define(['text!layouts/remark-dialog.html', 'text!layouts/confirm-dialog.html'], function(remarkDialogTpl, confirmDialogTpl) {
    var diName = 'BannerEditCtrl';
    return {
        __register__: function(mod) {
            mod.controller(diName, ['$rootScope','apiService', '$scope', '$state', '$window', '$location', '$modal', 'ds.banner', '$log', 'logger','dpDialog', BannerEditCtrl]);
            return mod;
        }
    };

    function BannerEditCtrl($rootScope, apiService, $scope, $state, $window, $location, $modal, DS, $log, logger,dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};

        if (isEditState) {
            DS.edit({
                'id': stateParams.id
            }).then(function (data) {
                $scope.entity = DS.data;
                $scope.entity.icon_id = $scope.entity.icon.id
                $scope.entity.rule_id = $scope.entity.aosruledata.id;
            });
        }



        //不通过时添加备注
        function remarkFun() {
            $modal.open({
                template: remarkDialogTpl,
                scope: $scope,
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.title = '添加备注';
                    $scope.content = '<textarea></textarea>';
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.confirm = function () {
                        DS['passCheck']({'checked':2, 'mark': $scope.entity.mark,'id':stateParams.id}).then(function (data) {
                            DS.logger.success('submit success.');
                        },function(data){
                            DS.logger.error('save failed.');
                        });
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        }


        //审核通过
        $scope.pass = function(){
            action = isEditState ? 'update' : 'add';
            DS['passCheck']({'checked':3, 'mark':'','id':stateParams.id}).then(function (data) {
                DS.logger.success('submit success.');
            },function(data){
                DS.logger.error('save failed.');
            });

        }

        //审核不通过
        $scope.nopass = function(){
            action = isEditState ? 'update' : 'add';
            remarkFun();
        }

        //提交审核
        $scope.reviewSubmit = function(){
            action = isEditState ? 'update' : 'add';
            return DS[action]($scope.entity)
                .then(function (data) {
                    var id = stateParams.id;
                    if(action === 'add'){
                        id = data.data.data.id;
                    }

                    DS['submit']({'items':[id]}).then(function (data) {
                        DS.logger.success('submit success.');
                    },function(data){
                        DS.logger.error(data.msg || 'save failed.');
                    });
                }, function (error) {
                    DS.logger.error(error.data.msg || 'save failed.');
                });

        }

        //init the collapse component
        $scope['isCollapse1'] = false;

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };

        $scope.save = function () {
            action = isEditState ? 'update' : 'add';
            saveEntity(function(){
                if (!$scope.isPopup) {
                }else{
                    setTimeout(function () {
                        location.reload();
                    }, 100);
                    !$scope.isPopup() && $window.history.back();
                }
            });
        };

        $scope.saveAndContinueEdit = function() {
            action = 'add';
            saveEntity();
        };

        $scope.saveAsNew = function() {
            action = 'add';
            saveEntity();
        };

        $scope.open = function ($event, columnName) { //for datepicker
            $event.preventDefault();
            $event.stopPropagation();
            $scope[columnName] = true;
        };

        $scope.removeFiled = function (modelName) {
            $scope.entity[modelName]='';
        };

        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/banner/check_unique');
        }

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
                from:'homepage_icon'
            });
        };

        var o = {
            'aosruledata':'rule_id',
            'icon':'icon_id'
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
            if( !$scope.entity.icon || $scope.entity.icon.length === 0){
                alert('banner资源不能为空');
                return false;
            }
            if( !$scope.entity.aosruledata || $scope.entity.aosruledata.length === 0){
                alert('推送规则不能为空');
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
                    DS.logger.error(error.data.msg || 'save failed.');
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
