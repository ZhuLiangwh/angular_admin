define(['common/utils/date'], function (dateUtil) {
    var diName = 'HotappEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope', '$state', '$modal', '$window','$location','$q', 'ds.hotapp', '$log', 'logger' , 'dpDialog', HotappEditCtrl]);
            return mod;
        }
    };

    function HotappEditCtrl($rootScope, $scope, $state, $modal, $window, $location, $q,DS, $log,logger, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

        $scope.entity = {};
        $scope.displayInfo = null;
        $scope.entity.banner = true;
        $scope.entity.promote = false || true;

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

        $scope.removeFiled = function (modelName) {
           $scope.entity[modelName]='';
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
                from:'square_hotapp'
            });

        };

        var o = {
            'aosruledata':'rule_id'
        }
        $window.onmessage = function(e){
            var data = e.data,
                item = data.item,
                single = data.single;
            //去重
            if(item.id in _.indexBy($scope.entity[curRefItem],'id')) return;
            if(single === 'false'){
                $scope.entity[curRefItem] = $scope.entity[curRefItem] || ($scope.entity[curRefItem] = []);
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

        function saveEntity(callback) {
            $scope.entity.cid = $scope.entity.category;
            //pre process the post item: remove the inline reference item to be deleted
            if(!$scope.entity.answer){
                alert("解决方案不能为空！");
            }else{
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
        }

        function clearForm() {
            $scope.entity = {};
        }

        //ueditor
        $scope.ready = function(editor){
            alert(editor.getContent());

        }

        $scope._simpleConfig = {
            //这里可以选择自己需要的工具按钮名称
            toolbars:[['undo', 'redo', '|',
                'bold', 'italic', 'underline', 'removeformat', '|', 'forecolor', 'backcolor', 'selectall', 'cleardoc', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'link', 'unlink']],
            //focus时自动清空初始化时的内容
            autoClearinitialContent:true,
            //关闭字数统计
            wordCount:false,
            //关闭elementPath
            elementPathEnabled:false
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
            },
            end: {
                dt: dateUtil.getRelativeDate(0, new Date())
            }
        };

        //$scope.formats = ['yyyy-MM-dd HH:mm:ss'];
        $scope.format = 'yyyy-MM-dd HH:mm:ss';

        $scope.$watch('datePicker.start.dt',function(newTime){
            $scope.entity.start_time = newTime-0;
        });

        $scope.$watch('datePicker.end.dt',function(newTime){
            $scope.entity.end_time = newTime-0;
        });

        if($scope.entity.banner){
            $scope.datePicker.start.dt = $scope.entity.start_time ? new Date($scope.entity.start_time): new Date();
            $scope.datePicker.end.dt =  $scope.entity.end_time ? new Date($scope.entity.end_time): new Date();
            $scope.entity.frequence = $scope.entity.frequence ?  $scope.entity.frequence : "1";
            $scope.entity.location = $scope.entity.location ? $scope.entity.location : "1";
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
                DS.getDisplayData()
                    .then(function(data) {
                        $scope.displayInfo = data.data.data;
                        $scope.entity.platform = $scope.displayInfo.platform[0].value;
                        $scope.entity.category = $scope.displayInfo.category[0].value;
                        deferred.resolve($scope.displayInfo);
                    }, function(error) {
                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        }

        checkDisplayData().then(function() {
            if(isEditState) {
                DS.edit({
                    'id': stateParams.id
                })
                    .then(function(data) {
                        $scope.entity = DS.data;
                        $scope.entity.category = $scope.entity.cid;
                        $scope.datePicker.start.dt = $scope.entity.start_time ? new Date($scope.entity.start_time): new Date();
                        $scope.datePicker.end.dt =  $scope.entity.end_time ? new Date($scope.entity.end_time): new Date();
                        $scope.entity.frequence = $scope.entity.frequence ?  $scope.entity.frequence : "1";
                        $scope.entity.location = $scope.entity.location ? $scope.entity.location : "1";
                    })
            }
        });

    }
});
