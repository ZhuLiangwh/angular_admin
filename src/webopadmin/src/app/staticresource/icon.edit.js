define([], function() {
  var diName = 'IconEditCtrl';
  return {
    __register__: function(mod) {
      mod.controller(diName, ['$rootScope', '$scope', '$state', '$window', '$location', '$q', 'ds.icon', '$log', 'logger','dpDialog', IconEditCtrl]);
      return mod;
    }
  };

  function IconEditCtrl($rootScope, $scope, $state, $window, $location, $q, DS, $log, logger,dpDialog) {
    var stateParams = $state.params,
        curRefItem, curRefIndex,
        isEditState = $scope.isEditState = _.has(stateParams, 'id'),action;

    clearForm();

    $scope.displayInfo = null;

    $scope.afterVali = function(){
      if( !$scope.entity.package || $scope.entity.package.length === 0){
        alert('项目名称不能为空');
        return false;
      }

      if( !$scope.entity.type || $scope.entity.type.length === 0){
        alert('文件类型不能为空');
        return false;
      }
    }

    checkDisplayData().then(function() {
      if($scope.isEditState) {
        DS.edit({
            'id': stateParams.id
          })
          .then(function(data) {
            $scope.entity = DS.data;
          })
          .then(function() {
            //handle the package rendering when in edit page
            var checkboxItems = $('.checkbox-type'),
              item;
            for(var i = 0, l = checkboxItems.length; i < l; i++) {
              var item = checkboxItems[i];
              column = $(item).data('column'),
                columnItems = $(item).data('checkbox').split(',');
              $scope.entity[column].forEach(function(columnItem) {
                var index = _.indexOf(columnItems, columnItem);
                $scope.checkbox[column + (index + 1)] = index > -1 ? true : false;
              });
            }
            //特殊处理convertItems
            $scope.checkbox.package = {};
            _.each($scope.entity.package, function(ele){
              $scope.checkbox.package[ele] = true;
            });
          });
      }
    })

    $scope.getFileInfo = function(node) {
      //文件选择框可能点击的是取消
      if(node.fileInfo) {
        var modelName = node.modelName.split('.'),
          fileNameReg = /\.(jpg|gif|png|bmp|jpeg)$/i;
        if(!fileNameReg.test(node.fileInfo.name)){
          logger.error('请上传正确的图片格式，正确的图片格式为：jpg,png,gif,bmp,jpeg.');
          return;
        }
        modelName = modelName[1] || modelName[0];
        $scope.entity[modelName] = node.fileInfo;
        
        $scope.iconChanged = true;
        $scope.$apply();//强制检查界面变化


        // reader = new FileReader();
        // reader.onload = function(evt){
        //     $scope.entity.icon = evt.target.result;
        //     $scope.$apply();
        // }
        // reader.readAsDataURL($scope.entity.icon);
      }
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

    $scope.packageChange = function(packageVal) {
      var modelValue = $scope.entity['package'] || [];
      if($scope.checkbox.package[packageVal]) { //if checked
        if(_.indexOf(modelValue, packageVal) === -1) {
          modelValue.push(packageVal);
        }
      } else {
        modelValue.splice(_.indexOf(modelValue, packageVal), 1);
      }
      $scope.entity['package'] = modelValue;
    };

    $scope.open = function($event, columnName) { //for datepicker
      $event.preventDefault();
      $event.stopPropagation();
      $scope[columnName] = true;
    };
    $scope.format = 'yyyy-MM-dd';


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
      for (var key in $scope.entity) {
        var item = $scope.entity[key];
        if (_.isArray(item) && item.length > 0 && _.isObject(item[0])) {
          $scope.entity[key] = _.filter(item, function (filterItem) {
            return !filterItem.isDelete;
          });
        }
      }

      return DS[action]($scope.entity)
          .then(function (data) {
            DS.logger.success('save success.');
            callback && callback();
            handlerPopSave(data.data.data);
          }, function (error) {
            DS.logger.error(error.data.msg || '');
            //save failed
          });
    }

    function handlerPopSave(item) {
      if ($location.search().popup) {
        var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'];
        ifr_window.postMessage({item:item,single:$location.search().single},'*');
        console.log(item);
        dpDialog.close();
      }
    }

    function clearForm() {
      $scope.entity = {};
      $scope.checkbox = {};
    }



    function checkDisplayData() {
      var deferred = $q.defer();
      if($scope.displayInfo) {
        deferred.resolve($scope.displayInfo);
      } else {
        DS.getDisplayData()
          .then(function(data) {
            $scope.displayInfo = data.data.data;
            $scope.displayInfo.platform.convertItems = _.indexBy($scope.displayInfo.platform.items, 'value');
            $scope.entity.platform = $scope.displayInfo.platform.items[0].value;
            deferred.resolve($scope.displayInfo);
          }, function(error) {
            deferred.reject(error);
          });
      }
      return deferred.promise;
    }
  }
})
