define([], function () {
    var diName = 'UsertagEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', '$scope','apiService','$q', '$state', '$window', '$location', 'ds.usertag', '$log','dpDialog', UsertagEditCtrl]);
            return mod;
        }
    };

    function UsertagEditCtrl($rootScope, $scope,apiService,$q,$state, $window, $location, DS, $log,dpDialog) {
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
        }else{
            $scope.entity.keywords = [];
            $scope.entity.userlogs = [];
        }


        //检查唯一性
        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/usertag/check_unique');
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
        $scope['isCollapse2'] = false;
        $scope['isCollapse3'] = false;
        



        // 添加群组
        $scope.addRow = function(){
            $scope.entity.keywords.push({"key":'',"score":''});
        };
        // 删除群组
        $scope.delRow = function (item) {
            var delIndex = $scope.entity.keywords.indexOf(item);
            $scope.entity.keywords.splice(delIndex,1);

        };
        $scope.addLogRow = function(){
            $scope.entity.userlogs.push({"key":1,"score":''});
        };
        // $scope.delLogRow = function ($index) {
        //     $scope.entity.userlogs.splice('$index',1);
        // };

        $scope.delLogRow = function (item) {
            var delIndex = $scope.entity.userlogs.indexOf(item);
            $scope.entity.userlogs.splice(delIndex,1);
        };


        function savedata(){
            var data = [];
            $scope.entity.keywords.forEach(function(item){
                // item.key && (data.push({item.key,item.score}));
                item.key && (data.push(item.key));
            });
            $scope.entity.userlogs.forEach(function(item){
                // item.key && (data.push({item.key,item.score}));
                item.key && (data.push(item.key));
            });
        };


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
            addCheckunique();
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
            //pre process the post item: remove the inline reference item to be deleted
            savedata();
            // console.log($scope.entity.userlogs);
            // return;
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
                        $scope.displayInfo = data.data.data;
                        $scope.entity.key = $scope.displayInfo.key[0].number;

                        deferred.resolve($scope.displayInfo);
                    }, function(error) {
                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        }
    }
});
