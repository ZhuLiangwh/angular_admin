define([], function() {
    var diName = 'AthemeEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope', 'apiService', '$state', '$window', '$location', 'ds.atheme', 'logger','$log','dpDialog',AthemeEditCtrl]);
            return mod;
        }
    };

    function AthemeEditCtrl($rootScope, $scope, apiService, $state, $window, $location, DS,logger, $log, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            curRefItem, curRefIndex, action;

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
            return apiService.getApiUrl('/atheme/extra/check_unique');
        }
        $scope.methods = function(){
            return getMethod = isEditState ? 'update' : 'add';
        }
        $scope.ids = function(){
            return getId = stateParams.id;
        }


        $scope.save = function () {
            action = isEditState ? 'update' : 'add';
            return DS['addCheckunique']({name: $scope.entity.name, method: action, id: $scope.entity.id})
                .then(function(data){
                    if(data.data.data.unique === true){
                        saveEntity(function(){
                            if (!$scope.isPopup) {
                            }else{
                                !$scope.isPopup() && $window.history.back();
                            }
                        });
                    }else{
                        DS.logger.error('Title should be unique');
                    }
                },function(error){

                })
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
                from:'staticresource_athemelocale'
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

        $scope.getFileInfo = function(node) {
           var  reader;
          //文件选择框可能点击的是取消
          if(node.fileInfo) {
            var modelName = node.modelName.split('.')[1],
              fileNameReg = /\.(jpg|gif|png|bmp|jpeg)$/i;
            if(!fileNameReg.test(node.fileInfo.name)){
              logger.error('请上传正确的图片格式，正确的图片格式为：jpg,png,gif,bmp,jpeg.');
              return;
            }
            reader = new FileReader();
            reader.onload = function(evt){
                $scope.entity[modelName] = evt.target.result
                $scope.$apply();
            }
            reader.readAsDataURL(node.fileInfo);
            $scope.entity[modelName+'_file'] = node.fileInfo
          }
        };

        function saveEntity(callback) {
            var fd = new FormData(), key,obj = $.extend({},$scope.entity);
            fd.append('id', stateParams.id);   
            //将图片的base64转换成文件
            for (key in obj) {
                var val = obj[key],tKey;
                if(key.indexOf('_file')){
                    tKey = key.replace('_file','');
                    obj[tKey] = val;

                }

            }

            //将参数转换成formdata,这样才能传送文件
            for(key in obj){
                var val = obj[key];
                delete obj['thumbnail1_file'];
                delete obj['thumbnail2_file'];
                delete obj['wallpaper_file'];
                fd.append(key, _.isObject(val) && !val.size ? JSON.stringify(val) : val);
            }

            return DS[action](fd)
                .then(function (data) {
                    DS.logger.success('save success.');
                    callback && callback();
                    handlerPopSave(data.data.data);
                }, function (error) {
                    DS.logger.error(error.data.msg || 'save failed.');
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
