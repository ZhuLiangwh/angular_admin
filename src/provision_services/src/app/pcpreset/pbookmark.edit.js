define([], function () {
    var diName = 'PCbookmarkEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$rootScope', 'apiService','$scope', '$state', '$window', '$location', 'ds.pbookmark', '$log','dpDialog', PCbookmarkEditCtrl]);
            return mod;
        }
    };

    function PCbookmarkEditCtrl($rootScope, apiService,$scope, $state, $window, $location, DS, $log,dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id'),
            action;

        $scope.entity = {};

        $scope.getCheckSortUrl = function() {
            return apiService.getApiUrl('/pbookmark/check_unique');
        }

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

        //保存为新的时，原始值赋为空
        function addCheckunique(){
            action = 'add';
            return DS['addCheckunique']({title: $scope.entity.title, method:action, id: $scope.entity.id})
                .then(function(data){
                    if(data.data.data.unique === true){
                        saveEntity();
                    }else{
                        DS.logger.error('Title should be unique');
                    }
                },function(error){

                })
        }

        //init the collapse component
        $scope['isCollapse1'] = false;


        $scope.save = function () {
            action = isEditState ? 'update' : 'add';
            return DS['addCheckunique']({title: $scope.entity.title, method: action, id: $scope.entity.id})
                .then(function(data){
                    if(data.data.data.unique === true){
                        saveEntity(function(){
                            !$scope.isPopup() && $window.history.back();
                        });
                    }else{
                        DS.logger.error('Title should be unique');
                    }
                },function(error){

                })
        };

        $scope.saveAndContinueEdit = function () {
            action = 'add';
            saveEntity();
        };

        $scope.saveAsNew = function () {
            addCheckunique();
        };

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
            //handlerPopSave({'title':'1111test'})
            return DS[action]($scope.entity).then(function (data) {
                DS.logger.success('save success.');
                callback && callback();
                handlerPopSave(data.data.data);
            }, function (error) {
                DS.logger.error(error.data.msg || '');
                //save failed
            });
        }

        function clearForm() {
            $scope.entity = {};
        }
        var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'];
        function handlerPopSave(item) {
            if ($location.search().popup) {
                ifr_window.postMessage({item:item,single:$location.search().single},'*');
                dpDialog.close();
            }
        }
    }
});
