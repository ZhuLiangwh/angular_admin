define([], function() {
  var diName = 'AossourceEditCtrl';
  return {
    __register__: function(mod) {
      mod.controller(diName, ['$rootScope', '$scope', '$state', '$window', '$location', 'ds.aossource', '$log', AossourceEditCtrl]);
      return mod;
    }
  };

  function AossourceEditCtrl($rootScope, $scope, $state, $window, $location, DS, $log) {
    var stateParams = $state.params,
      isEditState = _.has(stateParams, 'id');

    if(isEditState) {
      DS.edit({
        'id': stateParams.id
      }).then(function(data) {
        $scope.entity = DS.data;
      });
    }

    //init the collapse component
    $scope['isCollapse1'] = false;

    $scope.save = function() {
      saveEntity(function() {
        $window.history.back();
      });
    };

    $scope.saveAndContinueEdit = function() {
      saveEntity();
    };

    $scope.saveAsNew = function() {
      saveEntity(function() {
        clearForm();
      });
    };

    function saveEntity(callback) {
      var action = isEditState ? 'update' : 'add';
      return DS[action]($scope.entity).then(function() {
        DS.logger.success('save success.');
        callback && callback();
      }, function(error) {
        DS.logger.error('save failed.');
        //save failed
      });
    }

    function clearForm() {
      $scope.entity = {};
    }

  }
});
