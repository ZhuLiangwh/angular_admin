define([], function () {
    var diName = 'AosruledataEditCtrl';
    return {
        __register__: function (mod) {
            mod.controller(diName, ['$scope', '$state', '$stateParams','$q', '$window','$location', 'ds.aosruledata','dpDialog', AosruledataEditCtrl]);
            return mod;
        }
    };

    function AosruledataEditCtrl($scope, $state, $stateParams,$q, $window,$location, DS, dpDialog) {
        var stateParams = $state.params,
            isEditState = $scope.isEditState = _.has(stateParams, 'id');
        var o = {}, action;

        clearForm();

        $scope.displayInfo = null;
        $scope.checkbox.package = {};

        $scope.afterVali = function(){
            getPackge();
            if($scope.entity.package.length === 0){
                alert('项目名称不能为空');
                return false;
            }
        }

        getDisplayData().then(function() {
            if($scope.isEditState) {
                DS.edit({
                    'id': stateParams.id
                })
                    .then(function(data) {
                        $scope.entity = DS.data;
                    })
                    .then(function() {
                        $scope.checkbox.package[$scope.entity.platform] = {};
                        _.each($scope.entity.package, function(ele){
                            $scope.checkbox.package[$scope.entity.platform][ele] = true;
                        });
                    });
            }
        })

        $scope.change = function(modelName, itemName, item) {
            var modelValue = $scope.entity[modelName] || [];
            if($scope.checkbox[itemName]) { //if checked
                if(_.indexOf(modelValue, item) === -1) {
                    modelValue.push(item);
                }
            } else {
                modelValue.splice(_.indexOf(modelValue, item), 1);
            }
            $scope.entity[modelName] = modelValue;
        };

        var arr = ['operators', 'sources', 'locales'];
        _.each(arr, function (item) {
            $scope.$watch(item + '_filter', function (newVal) {
                $scope[item] = _.filter(o[item], function (item) {
                    return item.display_value.indexOf(newVal) > -1;
                });
            });
        });

        $scope.isPopup = function () {
            return !!$location.search().popup;
        };

        $scope.save = function () {
            console.log($scope.entity)
            action = isEditState ? 'update' : 'add';
            saveEntity(function () {
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
            clearForm();
        };

        function getPackge(){
            var re = [];
            for(var key in $scope.checkbox.package[$scope.entity.platform]){
                $scope.checkbox.package[$scope.entity.platform][key] && re.push(key);
            }
            $scope.entity.package = re;
        }

        function saveEntity(callback) {
            getPackge();
            if(!$scope.entity.max_version){
                $scope.entity.max_version = 4294967295;
            }
            return DS[action]($scope.entity).then(function (data) {
                DS.logger.success('save success.');
                callback && callback();
                handlerPopSave(data.data.data);
            }, function (error) {
                DS.logger.error('save failed.');
                //save failed
            });
        }

        function clearForm() {
            $scope.entity = {};
            $scope.checkbox = {};
        }

        function handlerPopSave(item) {
            if ($location.search().popup) {
                var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'];
                ifr_window.postMessage({item:item,single:$location.search().single},'*');
                dpDialog.close();
            }
        }

        function getDisplayData(){
            var dfer = $q.defer()
            DS.getDisplayData().then(function(data){
                var data = $scope.displayInfo  = data.data.data;
                $scope.displayInfo.platform.convertItems = _.indexBy($scope.displayInfo.platform.items, 'value');

                $scope.entity.platform = $scope.displayInfo.platform.items[0].value;

                $scope.operators = data.operator;
                $scope.sources = data.source;
                $scope.locales = data.locale;

                o.operators = $scope.operators.slice(0);
                o.sources = $scope.sources.slice(0);
                o.locales = $scope.locales.slice(0);

                dfer.resolve(data)
            },function(error){
                dfer.reject(error);
            });
            return dfer.promise;
        }
    }
});
