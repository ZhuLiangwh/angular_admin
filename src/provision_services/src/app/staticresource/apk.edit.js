define([], function() {
  var diName = 'ApkEditCtrl';
  return {
    __register__: function(mod) {
      mod.controller(diName, ['$rootScope', '$scope', '$state', '$window', '$location', '$q', 'ds.apk', '$log', 'logger','dpDialog', ApkEditCtrl]);
      return mod;
    }
  };

  function ApkEditCtrl($rootScope, $scope, $state, $window, $location, $q, DS, $log, logger,dpDialog) {
    var stateParams = $state.params,
        isEditState = $scope.isEditState = _.has(stateParams, 'id'),
        action;

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



    //init the collapse component
    $scope['isCollapse1'] = false;


    $scope.save = function () {
      action = isEditState ? 'update' : 'add';
      saveEntity(function(){
        !$scope.isPopup() && $window.history.back();
      });
    };

    $scope.getFileInfo = function(node) {
      //文件选择框可能点击的是取消
      if(node.fileInfo) {
        var modelName = node.modelName.split('.'),
          fileNameReg = /\.(apk)$/i;
        if(!fileNameReg.test(node.fileInfo.name)){
          logger.error('请上传.apk后缀的文件');
          return;
        }
        modelName = modelName[1] || modelName[0];
        $scope.entity[modelName] = node.fileInfo;
      
        $scope.ApkChanged = true;
        $scope.$apply();//强制检查界面变化


        // reader = new FileReader();
        // reader.onload = function(evt){
        //     $scope.entity.Apk = evt.target.result;
        //     $scope.$apply();
        // }
        // reader.readAsDataURL($scope.entity.Apk);
      }
    }

    function saveEntity(callback) {

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




  }
})
