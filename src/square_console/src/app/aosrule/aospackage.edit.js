define([], function() {
  var diName = 'AospackageEditCtrl';
  return {
    __register__: function(mod) {
      mod.controller(diName, ['$scope', '$state', '$window', '$location', '$q', 'ds.aospackage', '$log','logger', AospackageEditCtrl]);
      return mod;
    }
  };

  function AospackageEditCtrl($scope, $state, $window, $location,$q, DS, $log, logger) {
    var stateParams = $state.params;

    var isEditState = $scope.isEditState = _.has(stateParams, 'id');
    clearForm();
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

    //init the collapse component
    $scope['isCollapse1'] = false;

    $scope.save = function () {
      action = isEditState ? 'update' : 'add';
      saveEntity(function(){
        $window.history.back();
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

    function checkDisplayData() {
      var deferred = $q.defer();
      if($scope.displayInfo) {
        deferred.resolve($scope.displayInfo);
      } else {
        DS.getDisplayData()
            .then(function(data) {
              $scope.displayInfo = data.data.data;
              //$scope.displayInfo.platform= _.indexBy($scope.displayInfo.platform, 'value');
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
