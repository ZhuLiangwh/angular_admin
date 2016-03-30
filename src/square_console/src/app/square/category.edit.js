define([], function() {
  var diName = 'CategoryEditCtrl';
  return {
    __register__: function(mod) {
      mod.controller(diName, ['$rootScope', '$scope', '$state', '$window', '$location', '$q', 'apiService', 'ds.category', '$log', 'logger', 'dpDialog',CategoryEditCtrl]);
      return mod;
    }
  };

  function CategoryEditCtrl($rootScope, $scope, $state, $window, $location,$q,apiService, DS, $log,logger,dpDialog) {
    var stateParams = $state.params,
        isEditState = $scope.isEditState = _.has(stateParams, 'id'),
        curRefItem, curRefIndex, action;

    $scope.displayInfo = null;
    $scope.entity = {};

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

    //init the collapse component
    $scope['isCollapse1'] = false;


    $scope.open = function($event, columnName) { //for datepicker
      $event.preventDefault();
      $event.stopPropagation();
      $scope[columnName] = true;
    };

    $scope.removeFiled = function (modelName) {
      $scope.entity[modelName]='';
    };


    $scope.save = function () {
      action = isEditState ? 'update' : 'add';
      saveEntity(function(){
        !$scope.isPopup() && $window.history.back();
      });
    };

    $scope.isPopup = function () {
      return !!$location.search().popup;
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
        from:'aospreset_aospredata'
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
      return DS[action]($scope.entity)
          .then(function (data) {
            DS.logger.success('save success.');
            callback && callback();
          }, function (error) {
            DS.logger.error(error.data.msg || 'save fail.');
          });
    }

    function clearForm() {
      $scope.entity = {};
    }

    function handlerPopSave(item) {
      if ($location.search().popup) {
        var ifr_window = top['dp_dialog'].length >= 2  ? top.frames[top['dp_dialog'].slice(-2)[0].from].contentWindow : top.frames['project'].frames['project'];
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
              deferred.resolve($scope.displayInfo);
            }, function(error) {
              deferred.reject(error);
            });
      }
      return deferred.promise;
    }

  }
});
