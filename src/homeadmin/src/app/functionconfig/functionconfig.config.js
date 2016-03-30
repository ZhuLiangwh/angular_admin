define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('functionconfig', {
            abstract: true,
            url: '/functionconfig',
            template: '<ui-view/>'
          })
            //graySwitch start
            .state('functionconfig.graySwitch', {
              url: '/graySwitch',
              templateUrl: 'app/functionconfig/graySwitch.list.html',
              data: {
                model: 'graySwitch',
                action: ['list']
              },
              controller: 'GraySwitchListCtrl'
            })
            .state('functionconfig.add-graySwitch', {
              url: '/graySwitch/add',
              templateUrl: 'app/functionconfig/graySwitch.edit.html',
              data: {
                model: 'graySwitch',
                action: ['add']
              },
              controller: 'GraySwitchEditCtrl'
            })
            .state('functionconfig.edit-graySwitch', {
              url: '/graySwitch/:id',
              templateUrl: 'app/functionconfig/graySwitch.edit.html',
              data: {
                model: 'graySwitch',
                action: ['edit']
              },
                model: 'graySwitch',
              controller: 'GraySwitchEditCtrl'
            })

            // white-list start
            .state('functionconfig.white-list', {
              url: '/white-list',
              templateUrl: 'app/functionconfig/white-list.list.html',
              data: {
                model: 'white-list',
                action: ['list']
              },
              controller: 'WhiteListCtrl'
            })
            .state('functionconfig.add-white-list', {
              url: '/white-list/add',
              templateUrl: 'app/functionconfig/white-list.edit.html',
              data: {
                model: 'white-list',
                action: ['add']
              },
              controller: 'WhiteEditCtrl'
            })
            .state('functionconfig.edit-white-list', {
              url: '/white-list/:id',
              templateUrl: 'app/functionconfig/white-list.edit.html',
              data: {
                model: 'white-list',
                action: ['edit']
              },
                model: 'white-list',
              controller: 'WhiteEditCtrl'
            })
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
